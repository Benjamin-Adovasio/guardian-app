//
//  AppSection.swift
//  Guardian App
//
//  Created by Benjamin on 1/17/26.
//


import SwiftUI

enum AppSection: String, CaseIterable, Identifiable {
    case home = "Emergency"
    case aed = "AED Locations"
    case firstAid = "First Aid"
    case contacts = "Contacts"
    case card = "Guardian Card"
    case settings = "Settings"

    var id: String { rawValue }

    var icon: String {
        switch self {
        case .home: return "house"
        case .aed: return "mappin.and.ellipse"
        case .firstAid: return "cross.case"
        case .contacts: return "phone"
        case .card: return "person.text.rectangle"
        case .settings: return "gearshape"
        }
    }
}
