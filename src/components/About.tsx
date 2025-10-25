import { useAbout } from "../hooks/useAbout";
import GridMotion from "./GridMotion";

export default function About() {
  const { about, fallbackText } = useAbout();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }
  const items = [
    "Item 1",
    <div key="jsx-item-1">Custom JSX Content</div>,
    "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Item 2",
    <div key="jsx-item-2">Custom JSX Content</div>,
    "Item 4",
    <div key="jsx-item-2">Custom JSX Content</div>,
    "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Item 5",
    <div key="jsx-item-2">Custom JSX Content</div>,
    "Item 7",
    <div key="jsx-item-2">Custom JSX Content</div>,
    "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Item 8",
    <div key="jsx-item-2">Custom JSX Content</div>,
    "Item 10",
    <div key="jsx-item-3">Custom JSX Content</div>,
    "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Item 11",
    <div key="jsx-item-2">Custom JSX Content</div>,
    "Item 13",
    <div key="jsx-item-4">Custom JSX Content</div>,
    "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Item 14",
    // Add more items as needed
  ];
  return (
    // <div className="bg-[rgba(6,18,28,1)] text-white flex flex-col md:flex-row justify-center items-center md:items-start gap-6 p-6 md:p-20">
    //   <img
    //     className="rounded-full w-50 h-50 flex-shrink-0"
    //     src={about.avatar_url}
    //     alt={about.name}
    //   />
    //   <div className="flex flex-col justify-center p-6 md:p-10">
    //     <p>{about.description}</p>
    //     <p>{about.twitter_username}</p>
    //     <p>{about.readme}</p>
    //   </div>
    // </div>

    // note: you'll need to make sure the parent container of this component is sized properly
    <div className="h-150 w-full relative">
      <div className="border-10 border-red-500 top-0 bg-white h-full">
        <GridMotion items={items} />
      </div>
    </div>
  );
}
