import SwiftUI

struct SettingsView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                GuardianHeaderBadge(title: "Application Preferences")

                Text("Settings")
                    .font(.system(size: 38, weight: .black, design: .rounded))
                    .foregroundStyle(GuardianTheme.textPrimary)

                Text("Manage notification, privacy, and account preferences for Guardian.")
                    .font(.title3)
                    .foregroundStyle(GuardianTheme.textSecondary)

                VStack(spacing: 12) {
                    settingsRow(title: "Location Access", subtitle: "Used to find nearby AEDs", icon: "location.fill")
                    settingsRow(title: "Emergency Alerts", subtitle: "Receive urgent campus notices", icon: "bell.badge.fill")
                    settingsRow(title: "Medical Profile", subtitle: "Manage Guardian Card information", icon: "person.text.rectangle.fill")
                }
                .padding(24)
                .guardianCardStyle()
            }
            .padding(24)
            .frame(maxWidth: 980, alignment: .leading)
            .frame(maxWidth: .infinity)
        }
        .background(GuardianTheme.background)
        .navigationTitle("Settings")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func settingsRow(title: String, subtitle: String, icon: String) -> some View {
        HStack(spacing: 14) {
            ZStack {
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(GuardianTheme.brandRed.opacity(0.10))

                Image(systemName: icon)
                    .foregroundStyle(GuardianTheme.brandRed)
            }
            .frame(width: 46, height: 46)

            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(.headline)
                    .foregroundStyle(GuardianTheme.textPrimary)

                Text(subtitle)
                    .font(.subheadline)
                    .foregroundStyle(GuardianTheme.textSecondary)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .font(.footnote.weight(.bold))
                .foregroundStyle(.tertiary)
        }
        .padding(16)
        .background(Color.black.opacity(0.02))
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
    }
}
