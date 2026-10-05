CREATE TABLE IF NOT EXISTS ql_lock (id INT PRIMARY KEY) ENGINE=InnoDB;
INSERT IGNORE INTO ql_lock (id) VALUES (1);
CREATE TABLE IF NOT EXISTS ql_settings (id INT PRIMARY KEY, installed INT NOT NULL DEFAULT 0, last_cron BIGINT NOT NULL DEFAULT 0) ENGINE=InnoDB;
INSERT IGNORE INTO ql_settings (id,installed) VALUES (1,0);
CREATE TABLE IF NOT EXISTS ql_users (
 id VARCHAR(40) PRIMARY KEY, email VARCHAR(190) UNIQUE, phone VARCHAR(24) UNIQUE,
 name VARCHAR(100) NOT NULL, password_hash VARCHAR(255), recovery_hash VARCHAR(255),
 role VARCHAR(16) NOT NULL DEFAULT 'citizen', office_id VARCHAR(40),
 lang VARCHAR(2) NOT NULL DEFAULT 'gu', travel INT NOT NULL DEFAULT 20,
 sms_opt_in INT NOT NULL DEFAULT 0, session_version INT NOT NULL DEFAULT 1,
 created BIGINT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS ql_offices (
 id VARCHAR(40) PRIMARY KEY, name TEXT NOT NULL, address TEXT NOT NULL, city VARCHAR(100) NOT NULL,
 official_url TEXT NOT NULL, verified INT NOT NULL DEFAULT 0, paused INT NOT NULL DEFAULT 0,
 notice TEXT NOT NULL, delay_minutes INT NOT NULL DEFAULT 0,
 opens INT NOT NULL DEFAULT 600, closes INT NOT NULL DEFAULT 1020,
 weekdays VARCHAR(20) NOT NULL DEFAULT '1,2,3,4,5,6', closures TEXT NOT NULL,
 priority_policy TEXT NOT NULL, updated BIGINT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS ql_services (
 id VARCHAR(40) PRIMARY KEY, office_id VARCHAR(40) NOT NULL, kind VARCHAR(40) NOT NULL,
 duration INT NOT NULL DEFAULT 15, capacity INT NOT NULL DEFAULT 1,
 checklist TEXT NOT NULL, source_url TEXT NOT NULL, verified_at BIGINT,
 enabled INT NOT NULL DEFAULT 1, UNIQUE KEY office_kind (office_id,kind),
 FOREIGN KEY (office_id) REFERENCES ql_offices(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS ql_counters (
 id VARCHAR(40) PRIMARY KEY, office_id VARCHAR(40) NOT NULL, service_id VARCHAR(40) NOT NULL,
 name VARCHAR(80) NOT NULL, paused INT NOT NULL DEFAULT 0,
 FOREIGN KEY (office_id) REFERENCES ql_offices(id), FOREIGN KEY (service_id) REFERENCES ql_services(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS ql_visits (
 id VARCHAR(40) PRIMARY KEY, user_id VARCHAR(40), office_id VARCHAR(40) NOT NULL,
 service_id VARCHAR(40) NOT NULL, arrival BIGINT NOT NULL, seat INT NOT NULL,
 token VARCHAR(30) NOT NULL UNIQUE, status VARCHAR(20) NOT NULL, mode VARCHAR(20) NOT NULL,
 name VARCHAR(100) NOT NULL, travel_minutes INT NOT NULL, grace_delay INT NOT NULL DEFAULT 0,
 priority INT NOT NULL DEFAULT 0, reason TEXT NOT NULL, counter_id VARCHAR(40),
 checked_at BIGINT, called_at BIGINT, started_at BIGINT, completed_at BIGINT, predicted_at BIGINT,
 active_user_service VARCHAR(100) UNIQUE, slot_key VARCHAR(140) UNIQUE,
 busy_counter VARCHAR(40) UNIQUE, created BIGINT NOT NULL, updated BIGINT NOT NULL,
 KEY visits_owner (user_id,created), KEY visits_queue (office_id,service_id,status,arrival),
 FOREIGN KEY (office_id) REFERENCES ql_offices(id), FOREIGN KEY (service_id) REFERENCES ql_services(id),
 FOREIGN KEY (user_id) REFERENCES ql_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS ql_audit (
 id VARCHAR(40) PRIMARY KEY, actor VARCHAR(40) NOT NULL, office_id VARCHAR(40), visit_id VARCHAR(40),
 action VARCHAR(60) NOT NULL, detail TEXT NOT NULL, created BIGINT NOT NULL,
 KEY audit_office (office_id,created)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS ql_notifications (
 id VARCHAR(40) PRIMARY KEY, user_id VARCHAR(40) NOT NULL, visit_id VARCHAR(40),
 kind VARCHAR(40) NOT NULL, message TEXT NOT NULL, dedup VARCHAR(160) NOT NULL UNIQUE,
 read_at BIGINT, created BIGINT NOT NULL, sms_state VARCHAR(16) NOT NULL DEFAULT 'off',
 KEY notification_owner (user_id,created), KEY notification_outbox (sms_state,created)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS ql_chats (
 id VARCHAR(40) PRIMARY KEY, user_id VARCHAR(40) NOT NULL, title VARCHAR(200) NOT NULL,
 messages MEDIUMTEXT NOT NULL, updated BIGINT NOT NULL, KEY chat_owner (user_id,updated)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS ql_limits (
 id VARCHAR(100) PRIMARY KEY, attempts INT NOT NULL DEFAULT 0, expires BIGINT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
