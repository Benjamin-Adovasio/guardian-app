import SwiftUI

struct ContentView: View {
    @State private var selection: AppSection? = nil
    @Environment(\.horizontalSizeClass) private var sizeClass

    var body: some View {
        if sizeClass == .compact {
            // iPhone
            NavigationStack {
                List(AppSection.allCases) { section in
                    NavigationLink(value: section) {
                        Label(section.title, systemImage: section.icon)
                    }
                }
                .navigationTitle("Guardian")
                .navigationDestination(for: AppSection.self) { section in
                    destinationView(for: section)
                }
            }
        } else {
            // iPad / macOS
            NavigationSplitView {
                SidebarView(selection: $selection)
            } detail: {
                if let selection {
                    destinationView(for: selection)
                } else {
                    HomeView()
                }
            }
        }
    }

    @ViewBuilder
    private func destinationView(for section: AppSection) -> some View {
        switch section {
        case .home:
            HomeView()
        case .aed:
            AEDLocationsView()
        case .firstAid:
            FirstAidView()
        case .card:
            GuardianCardView()
        case .settings:
            SettingsView()
        }
    }
}
