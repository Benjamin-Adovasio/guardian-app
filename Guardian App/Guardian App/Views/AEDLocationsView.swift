import MapKit
import SwiftUI

struct AEDLocationsView: View {
    let aeds: [AEDLocation] = JSONLoader.load("aed_locations.json")

    @StateObject private var locationManager = LocationManager()
    @State private var selectedAED: AEDLocation?
    @State private var position: MapCameraPosition = .region(
        MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 44.105, longitude: -70.202),
            span: MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.01)
        )
    )

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                GuardianHeaderBadge(title: "Campus AED Directory")

                Text("AED Locations")
                    .font(.system(size: 38, weight: .black, design: .rounded))
                    .foregroundStyle(GuardianTheme.textPrimary)

                Text("Find the closest automated external defibrillator on campus and open directions with one tap.")
                    .font(.title3)
                    .foregroundStyle(GuardianTheme.textSecondary)

                mapCard
                listCard
            }
            .padding(24)
            .frame(maxWidth: 980, alignment: .leading)
            .frame(maxWidth: .infinity)
        }
        .background(GuardianTheme.background)
        .navigationTitle("AED Locations")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            locationManager.requestCurrentLocation()
        }
    }

    private var mapCard: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Campus Map")
                        .font(.title3.weight(.bold))
                        .foregroundStyle(GuardianTheme.textPrimary)

                    Text(selectedAED == nil ? "Select a location below to focus the map." : selectedAED!.name)
                        .font(.subheadline)
                        .foregroundStyle(GuardianTheme.textSecondary)
                }

                Spacer()

                if let selectedAED {
                    Button("Directions") {
                        openMaps(for: selectedAED)
                    }
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.white)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 10)
                    .background(GuardianTheme.brandRed)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                }
            }

            Map(position: $position) {
                UserAnnotation()

                ForEach(aeds) { aed in
                    Annotation(aed.name, coordinate: aed.coordinate, anchor: .bottom) {
                        Button {
                            selectedAED = aed
                            focus(on: aed.coordinate)
                        } label: {
                            VStack(spacing: 6) {
                                ZStack {
                                    Circle()
                                        .fill(selectedAED?.id == aed.id ? GuardianTheme.brandRedDark : GuardianTheme.brandRed)

                                    Image(systemName: "bolt.heart.fill")
                                        .font(.subheadline.weight(.bold))
                                        .foregroundStyle(.white)
                                }
                                .frame(width: 34, height: 34)

                                Text(aed.name)
                                    .font(.caption2.weight(.semibold))
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(.white.opacity(0.95))
                                    .clipShape(Capsule(style: .continuous))
                            }
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .frame(height: 360)
            .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
            .onChange(of: locationManager.userLocation) { _, location in
                guard let location else { return }
                focus(on: location.coordinate, latitudeDelta: 0.005, longitudeDelta: 0.005)
            }
        }
        .padding(24)
        .guardianCardStyle()
    }

    private var listCard: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Available AEDs")
                .font(.title3.weight(.bold))
                .foregroundStyle(GuardianTheme.textPrimary)

            VStack(spacing: 12) {
                ForEach(aeds) { aed in
                    Button {
                        selectedAED = aed
                        focus(on: aed.coordinate)
                    } label: {
                        HStack(spacing: 14) {
                            ZStack {
                                RoundedRectangle(cornerRadius: 14, style: .continuous)
                                    .fill(GuardianTheme.brandRed.opacity(0.10))

                                Image(systemName: "bolt.heart.fill")
                                    .foregroundStyle(GuardianTheme.brandRed)
                            }
                            .frame(width: 48, height: 48)

                            VStack(alignment: .leading, spacing: 4) {
                                Text(aed.name)
                                    .font(.headline)
                                    .foregroundStyle(GuardianTheme.textPrimary)

                                Text(aed.location)
                                    .font(.subheadline)
                                    .foregroundStyle(GuardianTheme.textSecondary)
                            }

                            Spacer()

                            Image(systemName: "chevron.right")
                                .font(.footnote.weight(.bold))
                                .foregroundStyle(.tertiary)
                        }
                        .padding(16)
                        .background(selectedAED?.id == aed.id ? GuardianTheme.brandRed.opacity(0.08) : Color.black.opacity(0.02))
                        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                    }
                    .contextMenu {
                        Button("Open Directions") {
                            openMaps(for: aed)
                        }
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .padding(24)
        .guardianCardStyle()
    }

    private func openMaps(for aed: AEDLocation) {
        let placemark = MKPlacemark(coordinate: aed.coordinate)
        let mapItem = MKMapItem(placemark: placemark)
        mapItem.name = aed.name
        mapItem.openInMaps(launchOptions: [
            MKLaunchOptionsDirectionsModeKey: MKLaunchOptionsDirectionsModeWalking
        ])
    }

    private func focus(
        on coordinate: CLLocationCoordinate2D,
        latitudeDelta: Double = 0.004,
        longitudeDelta: Double = 0.004
    ) {
        position = .region(
            MKCoordinateRegion(
                center: coordinate,
                span: MKCoordinateSpan(
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                )
            )
        )
    }
}
