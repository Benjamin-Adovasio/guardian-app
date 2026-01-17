//
//  SidebarView.swift
//  Guardian App
//
//  Created by Benjamin on 1/17/26.
//


import SwiftUI

struct SidebarView: View {
    @Binding var selection: AppSection

    var body: some View {
        List(AppSection.allCases) { section in
            Button {
                selection = section
            } label: {
                Label(section.rawValue, systemImage: section.icon)
                    .fontWeight(selection == section ? .semibold : .regular)
                    .foregroundStyle(selection == section ? .red : .primary)
            }
        }
        .navigationTitle("Guardian")
    }
}
