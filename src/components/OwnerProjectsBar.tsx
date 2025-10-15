import { useOwner } from "../hooks/useOwner";

export default function Owner() {
  const { owner, fallbackText } = useOwner();

  if (!owner) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="bg-black text-white p-8 border-t border-gray-400">
      Projects: {owner.public_repos}
    </div>
  );
}
