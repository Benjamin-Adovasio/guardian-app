import SwiftUI

struct HomeView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {

                Text("Emergency")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundStyle(.red)

                Text("If this is a life-threatening emergency, call 911 immediately.")
                    .foregroundStyle(.secondary)

                Button {
                    call("911")
                } label: {
                    Label("Call 911", systemImage: "phone.fill")
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.red.opacity(0.15))
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                }

                Button {
                    call("0000000000") // campus safety
                } label: {
                    Label("Campus Safety", systemImage: "shield.fill")
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue.opacity(0.15))
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                }

                GroupBox("What to do now") {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("• Ensure scene safety")
                        Text("• Call for help")
                        Text("• Start CPR if needed")
                        Text("• Send someone to get an AED")
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
