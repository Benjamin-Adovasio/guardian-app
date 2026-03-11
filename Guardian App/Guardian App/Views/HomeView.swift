import CoreLocation
import SwiftUI

struct HomeView: View {
    @StateObject private var locationManager = LocationManager()

    private let emergencyContacts = [
        ("Campus Safety - Non Emergency", "2077866254"),
        ("Health Services", "2077866199"),
        ("CAPS", "2077866200"),
        ("Student Affairs", "2077866219"),
        ("SAPARS", "18775278644"),
        ("Lewiston Police", "2077846421"),
        ("CMMC ER", "2077952200"),
        ("St. Mary's Hospital ER", "2077778120"),
        ("Tri-County Mental Health Crisis Services", "2077834680")
    ]

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                heroSection
                locationStatusCard
                emergencyActionCard
                contactsCard
            }
            .padding(24)
            .frame(maxWidth: 980)
            .frame(maxWidth: .infinity)
        }
        .background(GuardianTheme.background)
        .navigationTitle("Emergency")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            locationManager.requestCurrentLocation()
        }
    }

    private var heroSection: some View {
        VStack(spacing: 18) {
            GuardianHeaderBadge(title: "Bates College Emergency Medical Services")

            Text("Quick Medical Access")
                .font(.system(size: 44, weight: .black, design: .rounded))
                .multilineTextAlignment(.center)
                .foregroundStyle(GuardianTheme.textPrimary)

            Text("Get immediate help, find AED locations, and access first aid information when you need it most.")
                .font(.title3)
                .multilineTextAlignment(.center)
                .foregroundStyle(GuardianTheme.textSecondary)
                .frame(maxWidth: 640)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 8)
    }

    private var locationStatusCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 10) {
                Image(systemName: locationStatusIcon)
                    .foregroundStyle(locationStatusForeground)

                VStack(alignment: .leading, spacing: 4) {
                    Text(locationStatusTitle)
                        .font(.headline)
                        .foregroundStyle(GuardianTheme.textPrimary)

                    Text(locationStatusMessage)
                        .font(.subheadline)
                        .foregroundStyle(GuardianTheme.textSecondary)
                }
            }

            if shouldShowRetry {
                Button("Try Again") {
                    locationManager.requestCurrentLocation()
                }
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(GuardianTheme.textPrimary)
                .padding(.horizontal, 14)
                .padding(.vertical, 10)
                .background(.white.opacity(0.85))
                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
            }
        }
        .padding(24)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(locationStatusBackground)
        .overlay {
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .stroke(locationStatusBorder, lineWidth: 1.5)
        }
        .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
    }

    private var emergencyActionCard: some View {
        VStack(spacing: 22) {
            Image(systemName: "exclamationmark.circle")
                .font(.system(size: 52, weight: .light))
                .foregroundStyle(.white.opacity(0.82))

            Text("Medical Emergency?")
                .font(.system(size: 28, weight: .bold, design: .rounded))
                .foregroundStyle(.white)

            PrimaryActionButton(
                title: "Call Campus EMS Now",
                systemImage: "phone.fill",
                color: .white,
                fillColor: .white,
                textColor: GuardianTheme.brandRed,
                showsChevron: false
            ) {
                call("2077866111")
            }
            .frame(maxWidth: 320)

            Text("For life-threatening emergencies, call 911")
                .font(.subheadline.weight(.medium))
                .foregroundStyle(.white.opacity(0.88))

            HStack(spacing: 14) {
                compactActionButton(title: "Call 911", icon: "cross.case.fill") {
                    call("911")
                }

                compactActionButton(title: "Campus Safety", icon: "shield.fill") {
                    call("2077866111")
                }
            }
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 34)
        .frame(maxWidth: .infinity)
        .background(
            LinearGradient(
                colors: [GuardianTheme.brandRed, GuardianTheme.brandRedDark],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .clipShape(RoundedRectangle(cornerRadius: 26, style: .continuous))
        .shadow(color: GuardianTheme.brandRed.opacity(0.28), radius: 24, y: 16)
    }

    private var contactsCard: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("Emergency Contacts")
                .font(.title3.weight(.bold))
                .foregroundStyle(GuardianTheme.textPrimary)

            VStack(spacing: 12) {
                ForEach(emergencyContacts, id: \.0) { contact in
                    Button {
                        call(contact.1)
                    } label: {
                        HStack(spacing: 14) {
                            ZStack {
                                Circle()
                                    .fill(GuardianTheme.brandRed.opacity(0.10))

                                Image(systemName: "phone.fill")
                                    .foregroundStyle(GuardianTheme.brandRed)
                            }
                            .frame(width: 40, height: 40)

                            VStack(alignment: .leading, spacing: 2) {
                                Text(contact.0)
                                    .font(.headline)
                                    .foregroundStyle(GuardianTheme.textPrimary)

                                Text(formattedPhone(contact.1))
                                    .font(.subheadline)
                                    .foregroundStyle(GuardianTheme.textSecondary)
                            }

                            Spacer()

                            Image(systemName: "arrow.up.right")
                                .font(.footnote.weight(.bold))
                                .foregroundStyle(.tertiary)
                        }
                        .padding(16)
                        .background(Color.black.opacity(0.02))
                        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .padding(24)
        .guardianCardStyle()
    }

    private func compactActionButton(title: String, icon: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            HStack(spacing: 8) {
                Image(systemName: icon)
                Text(title)
                    .fontWeight(.semibold)
            }
            .font(.subheadline)
            .foregroundStyle(.white)
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .background(.white.opacity(0.14))
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        }
        .buttonStyle(.plain)
    }

    private var locationStatusTitle: String {
        switch locationManager.authorizationStatus {
        case .authorizedAlways, .authorizedWhenInUse:
            if locationManager.userLocation != nil {
                return "Location available"
            }

            return "Finding your location"
        case .notDetermined:
            return "Location permission needed"
        case .restricted, .denied:
            return "Location not available"
        @unknown default:
            return "Location unavailable"
        }
    }

    private var locationStatusMessage: String {
        switch locationManager.authorizationStatus {
        case .authorizedAlways, .authorizedWhenInUse:
            if let location = locationManager.userLocation {
                return "Using your current position near \(formattedCoordinate(location.coordinate))."
            }

            return "We are trying to center nearby AEDs around your current position."
        case .notDetermined:
            return "Allow location access to show the closest AEDs and campus resources."
        case .restricted, .denied:
            return "Location access is unavailable. You can still browse AED locations manually."
        @unknown default:
            return "Your location could not be determined right now."
        }
    }

    private var locationStatusIcon: String {
        switch locationManager.authorizationStatus {
        case .authorizedAlways, .authorizedWhenInUse:
            return locationManager.userLocation == nil ? "location.magnifyingglass" : "location.fill"
        case .notDetermined:
            return "location"
        case .restricted, .denied:
            return "location.slash"
        @unknown default:
            return "location.slash"
        }
    }

    private var locationStatusBackground: Color {
        switch locationManager.authorizationStatus {
        case .authorizedAlways, .authorizedWhenInUse:
            return locationManager.userLocation == nil ? GuardianTheme.warningBackground : GuardianTheme.successBackground
        case .notDetermined, .restricted, .denied:
            return GuardianTheme.warningBackground
        @unknown default:
            return GuardianTheme.warningBackground
        }
    }

    private var locationStatusBorder: Color {
        switch locationManager.authorizationStatus {
        case .authorizedAlways, .authorizedWhenInUse:
            return locationManager.userLocation == nil ? GuardianTheme.warningBorder : GuardianTheme.successForeground.opacity(0.35)
        case .notDetermined, .restricted, .denied:
            return GuardianTheme.warningBorder
        @unknown default:
            return GuardianTheme.warningBorder
        }
    }

    private var locationStatusForeground: Color {
        switch locationManager.authorizationStatus {
        case .authorizedAlways, .authorizedWhenInUse:
            return locationManager.userLocation == nil ? GuardianTheme.accentGold : GuardianTheme.successForeground
        case .notDetermined, .restricted, .denied:
            return GuardianTheme.accentGold
        @unknown default:
            return GuardianTheme.accentGold
        }
    }

    private var shouldShowRetry: Bool {
        switch locationManager.authorizationStatus {
        case .authorizedAlways, .authorizedWhenInUse, .notDetermined:
            return true
        case .restricted, .denied:
            return false
        @unknown default:
            return false
        }
    }

    private func formattedCoordinate(_ coordinate: CLLocationCoordinate2D) -> String {
        "\(coordinate.latitude.formatted(.number.precision(.fractionLength(3)))), \(coordinate.longitude.formatted(.number.precision(.fractionLength(3))))"
    }

    private func formattedPhone(_ number: String) -> String {
        guard number.count == 10 else { return number }
        let areaCode = number.prefix(3)
        let prefix = number.dropFirst(3).prefix(3)
        let line = number.suffix(4)
        return "(\(areaCode)) \(prefix)-\(line)"
    }

    private func call(_ number: String) {
        if let url = URL(string: "tel://\(number)") {
            UIApplication.shared.open(url)
        }
    }
}
