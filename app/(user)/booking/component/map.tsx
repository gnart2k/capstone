import { MapProvider } from "@/provider/map-provider";
import { MapComponent } from "./mapComponent";

export default function Map() {
  return (
    <MapProvider>
      <MapComponent />
    </MapProvider>
  )
}
