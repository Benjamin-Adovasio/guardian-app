import SwiftUI

struct FirstAidView: View {

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {

                // Page title
                Text("First Aid")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .padding(.horizontal)

                Text("Basic emergency guidance. Always call 911 in a life-threatening situation.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)

                // Cards
                FirstAidCard(
                    title: "CPR",
                    icon: "heart.fill",
                    steps: [
                        "Check responsiveness",
                        "Call 911",
                        "Begin chest compressions (100–120/min)",
                        "Use AED when available"
                    ]
                )

                FirstAidCard(
                    title: "Severe Bleeding",
                    icon: "drop.fill",
                    steps: [
                        "Apply firm pressure",
                        "Use a clean cloth or bandage",
                        "Elevate if possible",
                        "Do not remove embedded objects"
                    ]
                )

                FirstAidCard(
                    title: "Choking",
                    icon: "lungs.fill",
                    steps: [
                        "Ask if the person can speak",
                        "Perform abdominal thrusts",
                        "Call 911 if unsuccessful"
                    ]
                )

                FirstAidCard(
                    title: "Unconscious Person",
                    icon: "person.fill.xmark",
                    steps: [
                        "Call 911",
                        "Check breathing",
                        "Begin CPR if not breathing",
                        "Stay until help arrives"
                    ]
                )
            }
            .padding(.vertical)
        }
        .navigationTitle("First Aid")
    }
}
