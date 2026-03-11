//
//  PrimaryActionButton.swift
//  Guardian App
//
//  Created by Benjamin on 1/19/26.
//


import SwiftUI

struct PrimaryActionButton: View {
    let title: String
    let systemImage: String
    let color: Color
    var fillColor: Color? = nil
    var textColor: Color? = nil
    var showsChevron = true
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Image(systemName: systemImage)
                    .font(.title2)

                Text(title)
                    .font(.headline)

                Spacer()

                if showsChevron {
                    Image(systemName: "arrow.right")
                        .font(.subheadline.weight(.bold))
                }
            }
            .padding(.horizontal, 18)
            .padding(.vertical, 16)
            .background((fillColor ?? color.opacity(0.15)))
            .foregroundStyle(textColor ?? color)
            .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        }
        .buttonStyle(.plain)
    }
}
