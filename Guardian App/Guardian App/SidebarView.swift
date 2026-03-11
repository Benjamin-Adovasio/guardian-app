import SwiftUI

struct SidebarView: View {
    @Binding var selection: AppSection?

    var body: some View {
        ZStack(alignment: .topLeading) {
            GuardianTheme.sidebar
                .ignoresSafeArea()

            VStack(alignment: .leading, spacing: 28) {
                HStack(spacing: 12) {
                    ZStack {
                        Circle()
                            .fill(.black.opacity(0.9))

                        Image(systemName: "bolt.heart.fill")
                            .font(.headline.weight(.bold))
                            .foregroundStyle(.white)
                    }
                    .frame(width: 40, height: 40)

                    VStack(alignment: .leading, spacing: 2) {
                        Text("Guardian")
                            .font(.title3.weight(.bold))
                            .foregroundStyle(.white)

                        Text("Emergency Services")
                            .font(.caption.weight(.medium))
                            .foregroundStyle(.white.opacity(0.85))
                    }
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(GuardianTheme.brandRed)
                .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))

                VStack(alignment: .leading, spacing: 8) {
                    ForEach(AppSection.allCases) { section in
                        Button {
                            selection = section
                        } label: {
                            HStack(spacing: 12) {
                                Image(systemName: section.icon)
                                    .frame(width: 18)

                                Text(section.title)
                                    .font(.subheadline.weight(selection == section ? .semibold : .medium))

                                Spacer()
                            }
                            .foregroundStyle(selection == section ? GuardianTheme.brandRed : GuardianTheme.textPrimary)
                            .padding(.horizontal, 14)
                            .padding(.vertical, 12)
                            .background(selection == section ? GuardianTheme.surface : .clear)
                            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                        }
                        .buttonStyle(.plain)
                    }
                }

                VStack(alignment: .leading, spacing: 10) {
                    Label("Emergency Notice", systemImage: "exclamationmark.triangle.fill")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(GuardianTheme.brandRed)

                    Text("For life-threatening emergencies, always call 911 first.")
                        .font(.footnote)
                        .foregroundStyle(GuardianTheme.brandRedDark)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(GuardianTheme.brandRed.opacity(0.06))
                .overlay {
                    RoundedRectangle(cornerRadius: 18, style: .continuous)
                        .stroke(GuardianTheme.brandRed.opacity(0.18), lineWidth: 1)
                }
                .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))

                Spacer()
            }
            .padding(18)
        }
        .navigationTitle("")
    }
}
