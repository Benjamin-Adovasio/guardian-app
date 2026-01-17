//
//  JSONLoader.swift
//  Guardian App
//
//  Created by Benjamin on 1/17/26.
//


import Foundation

enum JSONLoader {
    static func load<T: Decodable>(_ filename: String) -> T {
        let url = Bundle.main.url(forResource: filename, withExtension: nil)!
        let data = try! Data(contentsOf: url)
        return try! JSONDecoder().decode(T.self, from: data)
    }
}
