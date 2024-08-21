#!/usr/bin/env node
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import { gzipSizeSync } from 'gzip-size';
import { mkdirp } from 'mkdirp';
import fs from 'fs';
import path from 'node:path';

// Pull options from `package.json`
const join = (so, st) => `${so}/${st}`;
const read = (so, st) => fs.readFileSync(path.join(so, st));
const options = getOptions();
const BUILD_OUTPUT_DIRECTORY = getBuildOutputDirectory(options);

// first we check to make sure that the build output directory exists
const nextMetaRoot = join(process.cwd(), BUILD_OUTPUT_DIRECTORY);
try {
  fs.accessSync(nextMetaRoot, fs.constants.R_OK);
} catch (err) {
  console.error(
    `No build output found at "${nextMetaRoot}" - you may not have your working directory set correctly, or not have run "next build".`
  );
  process.exit(1);
}

// if so, we can import the build manifest
const buildMeta = JSON.parse(read(nextMetaRoot, 'build-manifest.json'));
const appDirMeta = JSON.parse(read(nextMetaRoot, 'app-build-manifest.json'));

// this memory cache ensures we dont read any script file more than once
// bundles are often shared between pages
const cache = new Map();

// since _app is the template that all other pages are rendered into,
// every page must load its scripts. we'll measure its size here
const globalBundle = buildMeta.pages['/_app'];
const globalBundleSizes = getScriptSizes(globalBundle);

// next, we calculate the size of each page's scripts, after
// subtracting out the global scripts
const allPageSizes = getAllScriptSizes(buildMeta.pages, globalBundle);

const globalAppDirBundle = buildMeta.rootMainFiles;
const globalAppDirBundleSizes = getScriptSizes(globalAppDirBundle);

const allAppDirSizes = getAllScriptSizes(appDirMeta.pages, globalAppDirBundle);

// format and write the output
const rawData = JSON.stringify({
  ...allAppDirSizes,
  __global: globalAppDirBundleSizes,
});

// log ouputs to the gh actions panel
console.log(rawData);

mkdirp.sync(join(nextMetaRoot, 'analyze/'));
fs.writeFileSync(join(nextMetaRoot, 'analyze/__bundle_analysis.json'), rawData);

// --------------
// Util Functions
// --------------

/**
 * Get all script sizes for all pages
 */
function getAllScriptSizes(metaPages, globalBundle) {
  const res = {};
  for (const [pagePath, scriptPaths] of Object.entries(metaPages)) {
    const scriptSizes = getScriptSizes(
      scriptPaths.filter(scriptPath => !globalBundle.includes(scriptPath))
    );
    res[pagePath] = scriptSizes;
  }

  return res;
}

// given an array of scripts, return the total of their combined file sizes
function getScriptSizes(scriptPaths) {
  let rawTotal = 0;
  let gzipTotal = 0;
  const scriptSize = scriptPaths.length;
  for (let i = 0; i < scriptSize; i++) {
    const [rawSize, gzipSize] = getScriptSize(scriptPaths[i]);
    rawTotal += rawSize;
    gzipTotal += gzipSize;
  }

  return { raw: rawTotal, gzip: gzipTotal };
}

// given an individual path to a script, return its file size
function getScriptSize(scriptPath) {
  const encoding = 'utf8';
  const p = join(nextMetaRoot, scriptPath);
  if (cache.has(p)) return cache.get(p);

  const content = fs.readFileSync(p, encoding);
  const rawSize = Buffer.byteLength(content, encoding);
  const gzipSize = gzipSizeSync(content);
  const result = [rawSize, gzipSize];
  cache.set(p, result);
  return result;
}

/**
 * Reads options from `package.json`
 */
function getOptions(pathPrefix = process.cwd()) {
  const pkg = JSON.parse(read(pathPrefix, 'package.json'));

  return { ...pkg.nextBundleAnalysis, name: pkg.name };
}

/**
 * Gets the output build directory, defaults to `.next`
 *
 * @param {object} options the options parsed from package.json.nextBundleAnalysis using `getOptions`
 * @returns {string}
 */
function getBuildOutputDirectory(options) {
  return options.buildOutputDirectory || '.next';
}
