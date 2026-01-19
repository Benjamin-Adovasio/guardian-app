import CoreLocation

struct AEDLocation: Identifiable, Codable {
    let id: String
    let name: String
    let location: String
    let latitude: Double
    let longitude: Double

    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }
}
