-- seed_data.sql

-- Insert roles
INSERT INTO Role (id, roleName) VALUES
  ('role_1', 'user'),
  ('role_2', 'staff'),
  ('role_3', 'manager'),
  ('role_4', 'admin'),

-- Insert users
INSERT INTO User (id, name, email, emailVerified, image, password, dob, phone, gender, credibility, roleId, status) VALUES
  ('user_1', 'Alice Smith', 'alice@example.com', '2025-06-01 10:00:00', 'https://example.com/alice.jpg', 'passwordHash1', '1985-08-12', '1234567890', 'female', 'good', 'role_1', true),
  ('user_2', 'Bob Johnson', 'bob@example.com', '2025-06-02 11:00:00', 'https://example.com/bob.jpg', 'passwordHash2', '1990-05-15', '0987654321', 'male', 'excellent', 'role_2', true),
  ('user_3', 'Charlie Davis', 'charlie@example.com', '2025-06-03 12:00:00', 'https://example.com/charlie.jpg', 'passwordHash3', '1988-11-30', '1112223333', 'male', 'average', 'role_3', true),
  ('user_4', 'Diana Evans', 'diana@example.com', '2025-06-04 13:00:00', 'https://example.com/diana.jpg', 'passwordHash4', '1995-03-22', '4445556666', 'female', 'good', 'role_4', true),
  ('user_5', 'Eve Martinez', 'eve@example.com', NULL, 'https://example.com/eve.jpg', 'passwordHash5', '1992-09-18', '5554443333', 'female', 'poor', 'role_5', true);

-- Insert accounts
INSERT INTO Account (id, userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) VALUES
  ('account_1', 'user_1', 'oauth', 'google', 'google_1', 'refreshToken1', 'accessToken1', 3600, 'Bearer', 'profile email', 'idToken1', 'state1'),
  ('account_2', 'user_2', 'oauth', 'facebook', 'facebook_2', 'refreshToken2', 'accessToken2', 3600, 'Bearer', 'profile', 'idToken2', 'state2'),
  ('account_3', 'user_3', 'oauth', 'github', 'github_3', NULL, 'accessToken3', NULL, 'Bearer', 'repo user', NULL, 'state3'),
  ('account_4', 'user_4', 'oauth', 'linkedin', 'linkedin_4', 'refreshToken4', 'accessToken4', 7200, 'Bearer', 'profile', NULL, 'state4'),
  ('account_5', 'user_5', 'oauth', 'twitter', 'twitter_5', NULL, 'accessToken5', NULL, 'Bearer', 'tweet.read', NULL, 'state5');

-- Insert services
INSERT INTO Service (id, serviceName, shortDescription, longDescription, promotionImg, servicePrice) VALUES
  ('service_1', 'House Cleaning', 'Basic house cleaning service', 'Comprehensive house cleaning service including living areas, bedrooms, bathrooms, and kitchens.', 'https://example.com/cleaning.jpg', '100.00'),
  ('service_2', 'Gardening', 'Basic gardening service', 'Full-service gardening including lawn mowing, weeding, and planting.', 'https://example.com/gardening.jpg', '150.00'),
  ('service_3', 'Plumbing', 'Emergency plumbing service', 'Emergency plumbing services for leaks, clogs, and repairs.', 'https://example.com/plumbing.jpg', '200.00'),
  ('service_4', 'Electrical Repairs', 'Basic electrical repair service', 'Repair services for electrical issues including wiring, outlets, and fixtures.', 'https://example.com/electrical.jpg', '250.00'),
  ('service_5', 'Pest Control', 'Basic pest control service', 'Pest control services for homes and businesses, including treatment and prevention.', 'https://example.com/pest.jpg', '180.00');

-- Insert service items
INSERT INTO ServiceItem (id, title, description, promotionImg, serviceId) VALUES
  ('serviceItem_1', 'Living Room Cleaning', 'Deep cleaning of living room areas.', 'https://example.com/living_room.jpg', 'service_1'),
  ('serviceItem_2', 'Bathroom Cleaning', 'Thorough cleaning of bathrooms.', 'https://example.com/bathroom.jpg', 'service_1'),
  ('serviceItem_3', 'Lawn Mowing', 'Professional lawn mowing service.', 'https://example.com/lawn.jpg', 'service_2'),
  ('serviceItem_4', 'Leak Repair', 'Fixing leaks in plumbing systems.', 'https://example.com/leak.jpg', 'service_3'),
  ('serviceItem_5', 'Outlet Replacement', 'Replacing old or faulty electrical outlets.', 'https://example.com/outlet.jpg', 'service_4');

-- Insert service combos
INSERT INTO ServiceCombo (id, title, description, price, serviceId, duration, staffNumber) VALUES
  ('serviceCombo_1', 'Spring Cleaning', 'Comprehensive cleaning of the entire home.', 300.00, 'service_1', 8.0, 2),
  ('serviceCombo_2', 'Garden Maintenance', 'Regular maintenance of garden areas.', 200.00, 'service_2', 5.0, 1),
  ('serviceCombo_3', 'Plumbing Checkup', 'Full checkup and maintenance of plumbing system.', 250.00, 'service_3', 4.0, 1),
  ('serviceCombo_4', 'Full Electrical Service', 'Complete electrical inspection and repair.', 400.00, 'service_4', 6.0, 2),
  ('serviceCombo_5', 'Pest Prevention', 'Preventive pest control treatment.', 220.00, 'service_5', 3.0, 1);

-- Insert provinces
INSERT INTO Province (id, provinceName) VALUES
  (1, 'Province A'),
  (2, 'Province B'),
  (3, 'Province C'),
  (4, 'Province D'),
  (5, 'Province E');

-- Insert districts
INSERT INTO District (id, districtName, provinceId) VALUES
  (1, 'District 1', 1),
  (2, 'District 2', 1),
  (3, 'District 3', 2),
  (4, 'District 4', 3),
  (5, 'District 5', 4);

-- Insert wards
INSERT INTO Ward (id, wardCode, wardName, districtId) VALUES
  (1, 'WC1', 'Ward 1', 1),
  (2, 'WC2', 'Ward 2', 1),
  (3, 'WC3', 'Ward 3', 2),
  (4, 'WC4', 'Ward 4', 3),
  (5, 'WC5', 'Ward 5', 4);

-- Insert addresses
INSERT INTO Address (id, provinceId, districtId, wardId, specificAddress, isDefault) VALUES
  ('address_1', 1, 1, 1, '123 Main St, City A', true),
  ('address_2', 1, 2, 2, '456 Elm St, City A', false),
  ('address_3', 2, 3, 3, '789 Pine St, City B', false),
  ('address_4', 3, 4, 4, '101 Maple St, City C', true),
  ('address_5', 4, 5, 5, '202 Oak St, City D', false);

-- Insert addresses on users
INSERT INTO AddressOnUser (addressId, userId) VALUES
  ('address_1', 'user_1'),
  ('address_2', 'user_2'),
  ('address_3', 'user_3'),
  ('address_4', 'user_4'),
  ('address_5', 'user_5');

-- Insert map addresses
INSERT INTO MapAddress (id, addressText, mapLink, lat, lng) VALUES
  ('map_1', '123 Main St, City A', 'https://maps.example.com/123main', 40.7128, -74.0060),
  ('map_2', '456 Elm St, City A', 'https://maps.example.com/456elm', 34.0522, -118.2437),
  ('map_3', '789 Pine St, City B', 'https://maps.example.com/789pine', 37.7749, -122.4194),
  ('map_4', '101 Maple St, City C', 'https://maps.example.com/101maple', 51.5074, -0.1278),
  ('map_5', '202 Oak St, City D', 'https://maps.example.com/202oak', 48.8566, 2.3522);

-- Insert map addresses on users
INSERT INTO MapAddressOnUser (mapId, userId) VALUES
  ('map_1', 'user_1'),
  ('map_2', 'user_2'),
  ('map_3', 'user_3'),
  ('map_4', 'user_4'),
  ('map_5', 'user_5');

-- Insert requests
INSERT INTO Request (id, serviceId, serviceComboId, date, time, price, staffNum, note, mapAddressId, addressId, type, paymentLink, phone, transactionId, userId, status) VALUES
  (1, 'service_1', 'serviceCombo_1', '2025-06-20', '09:00', 300.00, 2, 'Please focus on the living room.', 'map_1', 'address_1', 'normal', 'https://payment.example.com/pay1', '1234567890', 'tx_1', 'user_1', 'pending'),
  (2, 'service_2', 'serviceCombo_2', '2025-06-21', '10:00', 200.00, 1, 'Please take care of the front garden.', 'map_2', 'address_2', 'normal', 'https://payment.example.com/pay2', '0987654321', 'tx_2', 'user_2', 'confirmed'),
  (3, 'service_3', 'serviceCombo_3', '2025-06-22', '11:00', 250.00, 1, 'Check all bathroom plumbing.', 'map_3', 'address_3', 'normal', 'https://payment.example.com/pay3', '1112223333', 'tx_3', 'user_3', 'completed'),
  (4, 'service_4', 'serviceCombo_4', '2025-06-23', '12:00', 400.00, 2, 'Inspect the entire electrical system.', 'map_4', 'address_4', 'normal', 'https://payment.example.com/pay4', '4445556666', 'tx_4', 'user_4', 'pending'),
  (5, 'service_5', 'serviceCombo_5', '2025-06-24', '13:00', 220.00, 1, 'Focus on pest prevention in the kitchen.', 'map_5', 'address_5', 'normal', 'https://payment.example.com/pay5', '5554443333', 'tx_5', 'user_5', 'pending');

-- Insert request on staff
INSERT INTO RequestOnStaff (id, requestId, staffId) VALUES
  ('ros_1', 1, 'user_2'),
  ('ros_2', 2, 'user_3'),
  ('ros_3', 3, 'user_4'),
  ('ros_4', 4, 'user_5'),
  ('ros_5', 5, 'user_2');

-- Insert feedback
INSERT INTO Feedback (id, text, rate, userId, requestId) VALUES
  ('feedback_1', 'Great service! Highly recommended.', 5, 'user_1', 1),
  ('feedback_2', 'Good work, but could be faster.', 4, 'user_2', 2),
  ('feedback_3', 'Satisfied with the service.', 4, 'user_3', 3),
  ('feedback_4', 'Not very happy with the result.', 2, 'user_4', 4),
  ('feedback_5', 'Excellent job! Will use again.', 5, 'user_5', 5);

-- Insert capabilities
INSERT INTO Capabilities (id, userId, serviceId) VALUES
  ('capability_1', 'user_2', 'service_1'),
  ('capability_2', 'user_2', 'service_2'),
  ('capability_3', 'user_3', 'service_3'),
  ('capability_4', 'user_4', 'service_4'),
  ('capability_5', 'user_5', 'service_5');

-- Insert schedules
INSERT INTO Schedule (id, userId, taskName, startTime, endTime, date, requestId) VALUES
  ('schedule_1', 'user_2', 'House Cleaning', '09:00', '17:00', '2025-06-20', 1),
  ('schedule_2', 'user_3', 'Gardening', '10:00', '18:00', '2025-06-21', 2),
  ('schedule_3', 'user_4', 'Plumbing', '11:00', '19:00', '2025-06-22', 3),
  ('schedule_4', 'user_5', 'Electrical Repairs', '12:00', '20:00', '2025-06-23', 4),
  ('schedule_5', 'user_2', 'Pest Control', '13:00', '21:00', '2025-06-24', 5);

-- Insert verification tokens
INSERT INTO VerificationToken (id, email, token, expires) VALUES
  ('vtoken_1', 'alice@example.com', 'token_123', '2025-07-01 00:00:00'),
  ('vtoken_2', 'bob@example.com', 'token_456', '2025-07-02 00:00:00'),
  ('vtoken_3', 'charlie@example.com', 'token_789', '2025-07-03 00:00:00'),
  ('vtoken_4', 'diana@example.com', 'token_101112', '2025-07-04 00:00:00'),
  ('vtoken_5', 'eve@example.com', 'token_131415', '2025-07-05 00:00:00');

-- Insert password reset tokens
INSERT INTO PasswordResetToken (id, email, token, expires) VALUES
  ('prtoken_1', 'alice@example.com', 'reset_123', '2025-07-01 00:00:00'),
  ('prtoken_2', 'bob@example.com', 'reset_456', '2025-07-02 00:00:00'),
  ('prtoken_3', 'charlie@example.com', 'reset_789', '2025-07-03 00:00:00'),
  ('prtoken_4', 'diana@example.com', 'reset_101112', '2025-07-04 00:00:00'),
  ('prtoken_5', 'eve@example.com', 'reset_131415', '2025-07-05 00:00:00');

