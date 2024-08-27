interface ParamsType {
  id: string;
}

export default function PetDetailPage({ params }: { params: ParamsType }) {
  return <div data-testid="pet-detail-page">Pet detail {params.id}</div>;
}
