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
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Image(systemName: systemImage)
                    .font(.title2)
                Text(title)
                    .font(.headline)
                Spacer()
            }
            .padding()
            .background(color.opacity(0.15))
            .foregroundColor(color)
            .clipShape(RoundedRectangle(cornerRadius: 16))
        }
    }
}
