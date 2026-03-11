import SwiftUI

struct GuardianCardView: View {
    private let name = "John Doe"
    private let bloodType = "O+"
    private let allergies = "None"
    private let medicalNotes = "No known conditions"

    private let emergencyContacts = [
        ("Emergency Contact", "Jane Doe", "5551234567"),
        ("Campus Safety", "Campus Safety", "0000000000")
    ]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                GuardianHeaderBadge(title: "Medical ID Access")

                Text("Guardian Card")
                    .font(.system(size: 38, weight: .black, design: .rounded))
                    .foregroundStyle(GuardianTheme.textPrimary)

                Text("Keep essential medical details and emergency contacts ready for responders.")
                    .font(.title3)
                    .foregroundStyle(GuardianTheme.textSecondary)

                identityCard
                contactsCard
                actionsCard
            }
            .padding(24)
            .frame(maxWidth: 980, alignment: .leading)
            .frame(maxWidth: .infinity)
        }
        .background(GuardianTheme.background)
        .navigationTitle("Guardian Card")
        .navigationBarTitleDisplayMode(.inline)
    }

    private var identityCard: some View {
        VStack(alignment: .leading, spacing: 18) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 8) {
                    Text(name)
                        .font(.system(size: 30, weight: .bold, design: .rounded))
                        .foregroundStyle(.white)

                    Text("Emergency Medical Profile")
                        .font(.subheadline.weight(.medium))
                        .foregroundStyle(.white.opacity(0.8))
                }

                Spacer()

                Image(systemName: "person.text.rectangle.fill")
                    .font(.system(size: 28))
                    .foregroundStyle(.white.opacity(0.9))
            }

            Divider()
                .overlay(.white.opacity(0.25))

            VStack(spacing: 14) {
                cardDetailRow(label: "Blood Type", value: bloodType)
                cardDetailRow(label: "Allergies", value: allergies)
                cardDetailRow(label: "Medical Notes", value: medicalNotes)
            }
        }
        .padding(24)
        .background(
            LinearGradient(
                colors: [GuardianTheme.textPrimary, Color(red: 0.15, green: 0.19, blue: 0.29)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))
        .shadow(color: Color.black.opacity(0.16), radius: 28, y: 18)
    }

    private var contactsCard: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Emergency Contacts")
                .font(.title3.weight(.bold))
                .foregroundStyle(GuardianTheme.textPrimary)

            VStack(spacing: 12) {
                ForEach(emergencyContacts, id: \.0) { contact in
                    Button {
                        call(contact.2)
                    } label: {
                        HStack(spacing: 14) {
                            ZStack {
                                Circle()
                                    .fill(GuardianTheme.brandRed.opacity(0.10))

                                Image(systemName: "phone.fill")
                                    .foregroundStyle(GuardianTheme.brandRed)
                            }
                            .frame(width: 42, height: 42)

                            VStack(alignment: .leading, spacing: 2) {
                                Text(contact.1)
                                    .font(.headline)
                                    .foregroundStyle(GuardianTheme.textPrimary)

                                Text(contact.0)
                                    .font(.subheadline)
                                    .foregroundStyle(GuardianTheme.textSecondary)
                            }

                            Spacer()

                            Text(formattedPhone(contact.2))
                                .font(.subheadline.weight(.semibold))
                                .foregroundStyle(GuardianTheme.textPrimary)
                        }
                        .padding(16)
                        .background(Color.black.opacity(0.02))
                        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .padding(24)
        .guardianCardStyle()
    }

    private var actionsCard: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Quick Actions")
                .font(.title3.weight(.bold))
                .foregroundStyle(GuardianTheme.textPrimary)

            VStack(spacing: 12) {
                PrimaryActionButton(
                    title: "Call 911",
                    systemImage: "phone.fill",
                    color: GuardianTheme.brandRed
                ) {
                    call("911")
                }

                PrimaryActionButton(
                    title: "Add to Apple Wallet",
                    systemImage: "wallet.pass.fill",
                    color: GuardianTheme.textPrimary,
                    fillColor: GuardianTheme.textPrimary.opacity(0.08),
                    textColor: GuardianTheme.textPrimary
                ) {
                }
            }
        }
        .padding(24)
        .guardianCardStyle()
    }

    private func cardDetailRow(label: String, value: String) -> some View {
        HStack {
            Text(label)
                .font(.subheadline.weight(.medium))
                .foregroundStyle(.white.opacity(0.72))

            Spacer()

            Text(value)
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(.white)
        }
    }

    private func formattedPhone(_ number: String) -> String {
        guard number.count == 10 else { return number }
        let areaCode = number.prefix(3)
        let prefix = number.dropFirst(3).prefix(3)
        let line = number.suffix(4)
        return "(\(areaCode)) \(prefix)-\(line)"
    }

    private func call(_ number: String) {
        if let url = URL(string: "tel://\(number)") {
            UIApplication.shared.open(url)
        }
    }
}
