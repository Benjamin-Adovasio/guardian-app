import SwiftUI

struct HomeView: View {

    private let emergencyContacts = [
        ("Campus Safety - Non Emergency", "2077866254"),
        ("Health Services", "2077866199"),
        ("CAPS", "2077866200"),
        ("Student Affairs", "2077866219"),
        ("SAPARS", "18775278644"),
        ("Lewiston Police", "2077846421"),
        ("CMMC ER", "2077952200"),
        ("St. Mary's Hospital ER", "2077778120"),
        ("Tri-County Mental Health Crisis Services", "2077834680")
    ]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {

                // Title
                Text("Emergency")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundStyle(.red)

                Text("If this is a life-threatening emergency, call 911 immediately.")
                    .foregroundStyle(.secondary)

                // Call 911
                PrimaryActionButton(
                    title: "Call 911",
                    systemImage: "phone.fill",
                    color: .red
                ) {
                    call("911")
                }

                PrimaryActionButton(
                    title: "Campus Safety Emergency/Bates EMS",
                    systemImage: "shield.fill",
                    color: .blue
                ) {
                    call("2077866111")
                }
                
                // Emergency Contacts Section
                GroupBox("Emergency Contacts") {
                    VStack(spacing: 12) {
                        ForEach(emergencyContacts, id: \.0) { contact in
                            Button {
                                call(contact.1)
                            } label: {
                                HStack {
                                    Text(contact.0)
                                    Spacer()
                                    Image(systemName: "phone")
                                        .foregroundStyle(.secondary)
                                }
                            }
                        }
                    }
                }
            }
            .padding()
        }
    }

    private func call(_ number: String) {
        if let url = URL(string: "tel://\(number)") {
            UIApplication.shared.open(url)
        }
    }
}
