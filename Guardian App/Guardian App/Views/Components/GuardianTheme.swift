import SwiftUI

enum GuardianTheme {
    static let background = Color(red: 0.97, green: 0.96, blue: 0.96)
    static let surface = Color.white
    static let sidebar = Color(red: 0.95, green: 0.95, blue: 0.95)
    static let brandRed = Color(red: 0.78, green: 0.19, blue: 0.15)
    static let brandRedDark = Color(red: 0.64, green: 0.13, blue: 0.11)
    static let accentGold = Color(red: 0.90, green: 0.73, blue: 0.29)
    static let textPrimary = Color(red: 0.07, green: 0.10, blue: 0.18)
    static let textSecondary = Color(red: 0.39, green: 0.43, blue: 0.50)
    static let warningBackground = Color(red: 0.96, green: 0.94, blue: 0.86)
    static let warningBorder = Color(red: 0.91, green: 0.79, blue: 0.36)
    static let successBackground = Color(red: 0.90, green: 0.96, blue: 0.93)
    static let successForeground = Color(red: 0.12, green: 0.44, blue: 0.29)
}

struct GuardianCardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(GuardianTheme.surface)
            .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .stroke(Color.black.opacity(0.04), lineWidth: 1)
            }
            .shadow(color: Color.black.opacity(0.06), radius: 24, y: 10)
    }
}

extension View {
    func guardianCardStyle() -> some View {
        modifier(GuardianCardModifier())
    }
}

struct GuardianHeaderBadge: View {
    let title: String

    var body: some View {
        Label(title, systemImage: "cross.case.fill")
            .font(.subheadline.weight(.semibold))
            .foregroundStyle(GuardianTheme.brandRedDark)
            .padding(.horizontal, 14)
            .padding(.vertical, 8)
            .background(
                Capsule(style: .continuous)
                    .fill(GuardianTheme.brandRed.opacity(0.10))
            )
    }
}
