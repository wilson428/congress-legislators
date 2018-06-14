members <- read.csv("./retirements.csv", stringsAsFactors = F)
members$start <- as.Date(members$start)
members$end <- as.Date(members$end)

congress <- read.csv("./sessions.csv", stringsAsFactors = F)
congress$start_date <- as.Date(congress$start_date)
congress$end_date <- as.Date(congress$end_date)
