import PetLogo from '@/components/core/PageLogo/PetLogo';

interface LogoHeaderProps {
  h1?: string;
}

const LogoHeader = ({ h1 }: LogoHeaderProps) => {
  return (
    <header className="flex w-full items-center justify-center p-2 pt-14">
      <PetLogo type="bright" />
      {h1 ? <h1 className="visually-hidden">{h1}</h1> : null}
    </header>
  );
};

export default LogoHeader;
