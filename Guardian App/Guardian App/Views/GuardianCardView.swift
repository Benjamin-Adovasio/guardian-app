import SwiftUI

struct GuardianCardView: View {

    // MARK: - Sample Data (replace later with stored user data)

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
            VStack(spacing: 20) {

                // Identity Card
                card {
                    VStack(alignment: .leading, spacing: 12) {
                        Label(name, systemImage: "person.fill")
                            .font(.title2)
                            .fontWeight(.semibold)

                        Divider()

                        infoRow(label: "Blood Type", value: bloodType)
                        infoRow(label: "Allergies", value: allergies)
                        infoRow(label: "Medical Notes", value: medicalNotes)
                    }
                }

                // Emergency Contacts
                card {
                    VStack(alignment: .leading, spacing: 12) {
                        Label("Emergency Contacts", systemImage: "phone.fill")
                            .font(.headline)

                        ForEach(emergencyContacts, id: \.0) { contact in
                            Button {
                                call(contact.2)
                            } label: {
                                HStack {
                                    VStack(alignment: .leading) {
                                        Text(contact.1)
                                            .fontWeight(.semibold)
                                        Text(contact.0)
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                    }
                                    Spacer()
                                    Image(systemName: "phone")
                                }
                            }
                            Divider()
                        }
                    }
                }

                // Primary Actions
                card {
                    VStack(spacing: 12) {
                        Button {
                            call("911")
                        } label: {
                            actionRow(
                                title: "Call 911",
                                systemImage: "phone.fill",
                                color: .red
                            )
                        }

                        Button {
                            // Placeholder for Wallet / Share later
                        } label: {
                            actionRow(
                                title: "Add to Apple Wallet",
                                systemImage: "wallet.pass.fill",
                                color: .blue
                            )
                        }
                    }
                }
            }
            .padding()
        }
        .navigationTitle("Guardian Card")
    }

    // MARK: - Reusable Components

    private func card<Content: View>(@ViewBuilder content: () -> Content) -> some View {
        content()
            .padding()
            .background(.thinMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 20))
    }

    private func infoRow(label: String, value: String) -> some View {
        HStack {
            Text(label)
                .foregroundStyle(.secondary)
            Spacer()
            Text(value)
                .fontWeight(.medium)
        }
    }

    private func actionRow(title: String, systemImage: String, color: Color) -> some View {
        HStack {
            Image(systemName: systemImage)
            Text(title)
                .fontWeight(.semibold)
            Spacer()
        }
        .padding()
        .background(color.opacity(0.15))
        .foregroundColor(color)
        .clipShape(RoundedRectangle(cornerRadius: 14))
    }

    private func call(_ number: String) {
        if let url = URL(string: "tel://\(number)") {
            UIApplication.shared.open(url)
        }
    }
}
