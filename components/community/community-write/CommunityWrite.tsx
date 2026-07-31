import { WriteHeader } from "./WriteHeader/WriteHeader";
import { WriteFormContainer } from "./WriteFormContainer/WriteFormContainer";

export function CommunityWrite() {
  return (
    <div className="max-w-[768px] mx-auto w-full flex flex-col p-4">
      <WriteHeader />
      <WriteFormContainer />
    </div>
  );
}
