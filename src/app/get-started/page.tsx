import { permanentRedirect } from "next/navigation";

export default function GetStartedRedirect() {
  permanentRedirect("/contact?type=briefing");
}
