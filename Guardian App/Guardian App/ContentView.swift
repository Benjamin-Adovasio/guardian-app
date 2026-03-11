import SwiftUI

struct ContentView: View {
    @State private var selection: AppSection? = .home
    @Environment(\.horizontalSizeClass) private var sizeClass

    var body: some View {
        Group {
            if sizeClass == .compact {
                compactLayout
            } else {
                regularLayout
            }
        }
        .background(GuardianTheme.background)
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

    private var compactLayout: some View {
        NavigationStack {
            ZStack {
                GuardianTheme.background
                    .ignoresSafeArea()

                ScrollView {
                    VStack(alignment: .leading, spacing: 20) {
                        HStack(spacing: 12) {
                            ZStack {
                                Circle()
                                    .fill(GuardianTheme.brandRedDark)

                                Image(systemName: "bolt.heart.fill")
                                    .foregroundStyle(.white)
                            }
                            .frame(width: 44, height: 44)

                            VStack(alignment: .leading, spacing: 2) {
                                Text("Guardian")
                                    .font(.title2.weight(.bold))
                                    .foregroundStyle(GuardianTheme.textPrimary)

                                Text("Emergency Services")
                                    .font(.subheadline)
                                    .foregroundStyle(GuardianTheme.textSecondary)
                            }
                        }

                        VStack(spacing: 10) {
                            ForEach(AppSection.allCases) { section in
                                NavigationLink(value: section) {
                                    HStack(spacing: 14) {
                                        Image(systemName: section.icon)
                                            .frame(width: 20)
                                            .foregroundStyle(GuardianTheme.brandRed)

                                        Text(section.title)
                                            .font(.headline)
                                            .foregroundStyle(GuardianTheme.textPrimary)

                                        Spacer()

                                        Image(systemName: "chevron.right")
                                            .font(.footnote.weight(.bold))
                                            .foregroundStyle(.tertiary)
                                    }
                                    .padding(18)
                                    .guardianCardStyle()
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                    .padding(20)
                }
            }
            .navigationTitle("")
            .navigationBarTitleDisplayMode(.inline)
            .navigationDestination(for: AppSection.self) { section in
                destinationView(for: section)
            }
        }
    }

    private var regularLayout: some View {
        NavigationSplitView {
            SidebarView(selection: $selection)
                .navigationSplitViewColumnWidth(min: 280, ideal: 320)
        } detail: {
            ZStack {
                GuardianTheme.background
                    .ignoresSafeArea()

                if let selection {
                    destinationView(for: selection)
                } else {
                    HomeView()
                }
            }
        }
        .navigationSplitViewStyle(.balanced)
    }
}
