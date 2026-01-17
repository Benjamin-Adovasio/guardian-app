import SwiftUI

struct AEDLocationsView: View {
    let aeds: [AEDLocation] = JSONLoader.load("aed_locations.json")

    var body: some View {
        List(aeds) { aed in
            VStack(alignment: .leading) {
                Text(aed.name)
                    .fontWeight(.semibold)
                Text(aed.location)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .navigationTitle("AED Locations")
    }
}
