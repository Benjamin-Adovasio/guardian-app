//
//  FirstAidCard.swift
//  Guardian App
//
//  Created by Benjamin on 1/19/26.
//


import SwiftUI

struct FirstAidCard: View {
    let title: String
    let icon: String
    let steps: [String]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 12) {
                ZStack {
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .fill(GuardianTheme.brandRed.opacity(0.10))

                    Image(systemName: icon)
                        .font(.title3.weight(.bold))
                        .foregroundStyle(GuardianTheme.brandRed)
                }
                .frame(width: 48, height: 48)

                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.headline)
                        .foregroundStyle(GuardianTheme.textPrimary)

                    Text("Immediate response steps")
                        .font(.subheadline)
                        .foregroundStyle(GuardianTheme.textSecondary)
                }

                Spacer()
            }

            ForEach(steps.indices, id: \.self) { index in
                HStack(alignment: .top, spacing: 12) {
                    Text("\(index + 1)")
                        .font(.subheadline.weight(.bold))
                        .foregroundStyle(GuardianTheme.brandRed)
                        .frame(width: 28, height: 28)
                        .background(GuardianTheme.brandRed.opacity(0.08))
                        .clipShape(Circle())

                    Text(steps[index])
                        .font(.subheadline)
                        .foregroundStyle(GuardianTheme.textSecondary)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .padding(14)
                .background(Color.black.opacity(0.02))
                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            }
        }
        .padding(22)
        .guardianCardStyle()
    }
}
