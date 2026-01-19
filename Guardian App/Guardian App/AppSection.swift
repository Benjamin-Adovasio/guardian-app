import SwiftUI

enum AppSection: String, CaseIterable, Identifiable {
    case home
    case aed
    case firstAid
    case card
    case settings

    var id: String { rawValue }

    /// Human-readable title shown in the UI
    var title: String {
        switch self {
        case .home:
            return "Emergency"
        case .aed:
            return "AED Locations"
        case .firstAid:
            return "First Aid"
        case .card:
            return "Guardian Card"
        case .settings:
            return "Settings"
        }
    }

    var icon: String {
        switch self {
        case .home:
            return "exclamationmark.triangle.fill"
        case .aed:
            return "bolt.heart.fill"
        case .firstAid:
            return "cross.case.fill"
        case .card:
            return "person.crop.rectangle"
        case .settings:
            return "gear"
        }
    }
}
