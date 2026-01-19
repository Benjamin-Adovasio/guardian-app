import SwiftUI
import MapKit

struct AEDLocationsView: View {
    let aeds: [AEDLocation] = JSONLoader.load("aed_locations.json")

    @StateObject private var locationManager = LocationManager()
    @State private var selectedAED: AEDLocation?

    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 44.105, longitude: -70.202),
        span: MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.01)
    )

    var body: some View {
        VStack(spacing: 0) {

            Map(
                coordinateRegion: $region,
                showsUserLocation: true,
                annotationItems: aeds
            ) { aed in
                MapAnnotation(coordinate: aed.coordinate) {
                    Button {
                        selectedAED = aed
                        openMaps(for: aed)
                    } label: {
                        VStack(spacing: 4) {
                            Image(systemName: "bolt.heart.fill")
                                .font(.title2)
                                .foregroundColor(
                                    selectedAED?.id == aed.id ? .blue : .red
                                )

                            Text(aed.name)
                                .font(.caption2)
                                .fixedSize()
                        }
                    }
                }
            }
            .frame(height: 350)
            .onChange(of: locationManager.userLocation) { location in
                guard let location else { return }

                region = MKCoordinateRegion(
                    center: location.coordinate,
                    span: MKCoordinateSpan(latitudeDelta: 0.005, longitudeDelta: 0.005)
                )
            }

            List(aeds) { aed in
                VStack(alignment: .leading) {
                    Text(aed.name)
                        .fontWeight(.semibold)
                    Text(aed.location)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .contentShape(Rectangle())
                .onTapGesture {
                    selectedAED = aed
                    region.center = aed.coordinate
                }
            }
        }
        .navigationTitle("AED Locations")
    }

    private func openMaps(for aed: AEDLocation) {
        let placemark = MKPlacemark(coordinate: aed.coordinate)
        let mapItem = MKMapItem(placemark: placemark)
        mapItem.name = aed.name
        mapItem.openInMaps(launchOptions: [
            MKLaunchOptionsDirectionsModeKey: MKLaunchOptionsDirectionsModeWalking
        ])
    }
}

