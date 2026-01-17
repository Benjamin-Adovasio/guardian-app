import SwiftUI

struct ContentView: View {
    @State private var selection: AppSection = .home

    var body: some View {
        NavigationSplitView {
            SidebarView(selection: $selection)
        } detail: {
            switch selection {
            case .home:
                HomeView()
            case .aed:
                AEDLocationsView()
            case .firstAid:
                FirstAidView()
            case .contacts:
                EmergencyContactsView()
            case .card:
                GuardianCardView()
            case .settings:
                SettingsView()
            }
        }

    }
}
