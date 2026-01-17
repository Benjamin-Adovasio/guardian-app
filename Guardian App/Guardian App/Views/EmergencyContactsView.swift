import SwiftUI

struct EmergencyContactsView: View {
    let contacts = [
        ("Campus Safety", "0000000000"),
        ("Health Services", "0000000001")
    ]

    var body: some View {
        List {
            ForEach(contacts, id: \.0) { contact in
                Button {
                    call(contact.1)
                } label: {
                    VStack(alignment: .leading) {
                        Text(contact.0)
                        Text(contact.1)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }
        }
        .navigationTitle("Contacts")
    }

    private func call(_ number: String) {
        if let url = URL(string: "tel://\(number)") {
            UIApplication.shared.open(url)
        }
    }
}
