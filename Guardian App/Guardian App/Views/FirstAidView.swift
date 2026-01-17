import SwiftUI

struct FirstAidView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 16) {

                GroupBox("CPR") {
                    Text("Check responsiveness\nCall 911\nBegin compressions")
                }

                GroupBox("Bleeding") {
                    Text("Apply firm pressure\nElevate if possible")
                }

                GroupBox("Choking") {
                    Text("Encourage coughing\nPerform abdominal thrusts if needed")
                }
            }
            .padding()
        }
        .navigationTitle("First Aid")
    }
}
