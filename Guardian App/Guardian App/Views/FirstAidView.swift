import SwiftUI

struct FirstAidView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                GuardianHeaderBadge(title: "Emergency First Aid Guidance")

                Text("First Aid")
                    .font(.system(size: 38, weight: .black, design: .rounded))
                    .foregroundStyle(GuardianTheme.textPrimary)

                Text("Basic emergency guidance for the most common critical situations. In any life-threatening emergency, call 911 immediately.")
                    .font(.title3)
                    .foregroundStyle(GuardianTheme.textSecondary)
                    .frame(maxWidth: 720, alignment: .leading)

                VStack(spacing: 16) {
                    FirstAidCard(
                        title: "CPR",
                        icon: "heart.fill",
                        steps: [
                            "Check responsiveness",
                            "Call 911",
                            "Begin chest compressions (100-120/min)",
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
            }
            .padding(24)
            .frame(maxWidth: 980, alignment: .leading)
            .frame(maxWidth: .infinity)
        }
        .background(GuardianTheme.background)
        .navigationTitle("First Aid")
        .navigationBarTitleDisplayMode(.inline)
    }
}
