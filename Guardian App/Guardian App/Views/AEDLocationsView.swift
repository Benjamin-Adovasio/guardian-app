import SwiftUI
import MapKit

struct AEDLocationsView: View {
    let aeds: [AEDLocation] = JSONLoader.load("aed_locations.json")

    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 41.3106, longitude: -72.9236),
        span: MKCoordinateSpan(latitudeDelta: 0.005, longitudeDelta: 0.005)
    )

    var body: some View {
        VStack(spacing: 0) {

            // Interactive map
            Map(coordinateRegion: $region, annotationItems: aeds) { aed in
                MapMarker(
                    coordinate: aed.coordinate,
                    tint: .red
                )
            }
            .frame(height: 300)

            // List below map
            List(aeds) { aed in
                VStack(alignment: .leading) {
                    Text(aed.name)
                        .fontWeight(.semibold)
                    Text(aed.location)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .navigationTitle("AED Locations")
    }
}
