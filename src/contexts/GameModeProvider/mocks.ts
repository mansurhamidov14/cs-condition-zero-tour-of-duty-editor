export const easyModeVdfExample = `
"CareerGame"
{
    "InitialPoints"             "2"
    "MatchWins"                 "3"
    "MatchWinBy"                "2"
    "Characters"                "Cooper Floyd Kenny Morris Stanley Vern Quincy Gus Ben Eddie Kent Oscar Phil Leon Pete Roger Maverick Cole Igor Larry Ray Sam Travis Kirk Alex Brent Jake Tex Lou Ace Rooster Eagle Sandman Barney Steel Duke Bear"

	// CostAvailability: for each bot point cost, specify the number of reputation points needed to hire him.
	// If a value is not present or 0, that cost and higher are assumed to be always available.
	"CostAvailability"
	{
		"1"						"1"
		"2"						"6"
		"3"						"10"
		"4"						"15"
		"5"						"99"
	}

    "Maps"
    {
        // Maps are in triplets
        // 'minEnemies' defines the minimum number of enemies of the map (from the 'bots' entry, left to right)
        // 'threshold' defines the Reputation Point value above which one enemy is added for every additional RP until we run out of bots on the 'bots' line

        // A note on tasks:
        //
        // tasks are one of the following:
        //    kill         <N> [survive | inarow]
        //    killwith     <N> <weapon> [survive | inarow]
        //    killblind    <N> [survive | inarow]
        //    winfast      <S> [survive | inarow]
        //    headshot     <N> [survive | inarow]
        //    headshotwith <N> <weapon> [survive | inarow]
        //    killall
        //    rescue       <N> [survive | inarow]
        //    rescueall
        //    injure       <N> [survive | inarow]
        //    injurewith   <N> <weapon> [survive | inarow]
        //
        // tasks can contain a numeric value (# of kills, # of seconds, etc)
        // tasks can contain a weapon name or weapon classname (for the killwith and headshotwith tasks)
        // you can add "survive" so the player must survive to the end of the round to complete the task
        // you can add "inarow" so the player must complete the task N times without dying (across round boundaries)
        // group words of a task with '.  I.e. 'kill 3'
        //
        // Weapon names/classes are:
        //    scout
        //    xm1014
        //    mac10
        //    aug
        //    ump45
        //    sg550
        //    galil
        //    famas
        //    awp
        //    mp5
        //    m249
        //    m3
        //    m4a1
        //    tmp
        //    sg552
        //    ak47
        //    p90
        //    shield
        //    weapon
        //    knife
        //    grenade (text is singular)
        //    hegren  (text is plural, but the behavior is the same)
        //    pistol
        //    SMG
        //    machinegun
        //    shotgun
        //    rifle
        //    sniper
        //    fn57
        //    elites

        // - start ------------------------------------------
        "de_dust_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech"
            "minEnemies"  "3"
            "threshold"   "2"
            "tasks"       "'kill 1'"
        }
        "cs_office_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Rat Screech Madman"
            "minEnemies"  "3"
            "threshold"   "2"
            "tasks"       "'killwith 1 SMG' 'rescue 1'"
        }
        "de_prodigy_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Screech Rat Madman"
            "minEnemies"  "3"
            "threshold"   "2"
            "tasks"       "'killwith 1 sniper'"
        }

        // - early -------------------------------------------
        "de_tides_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech"
            "minEnemies"  "5"
            "threshold"   "7"
            "tasks"       "'killwith 1 shotgun' 'winfast 90'"
        }
        "cs_italy_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech"
            "minEnemies"  "5"
            "threshold"   "7"
            "tasks"       "'killwith 1 sniper' 'rescue 1'"
        }
        "de_inferno_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech"
            "minEnemies"  "5"
            "threshold"   "7"
            "tasks"       "'killwith 1 pistol'"
        }

        // - halfway -----------------------------------------
        "de_dust2_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Outcast Splinter Worm"
            "minEnemies"  "6"
            "threshold"   "10"
            "tasks"       "'killwith 2 sniper' 'winfast 90'"
        }
        "cs_militia_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Splinter Outcast Worm"
            "minEnemies"  "6"
            "threshold"   "10"
            "tasks"       "'killwith 2 shotgun' 'rescue 1'"
        }
        "de_stadium_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Worm Outcast Splinter"
            "minEnemies"  "6"
            "threshold"   "10"
            "tasks"       "'killwith 2 aug' 'winfast 90'"
        }

        // - halfway ----------------------------------------
        "de_chateau_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Outcast Splinter Worm"
            "minEnemies"  "6"
            "threshold"   "13"
            "tasks"       "'killwith 2 m249'"
        }
        "cs_havana_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Worm Outcast Splinter"
            "minEnemies"  "6"
            "threshold"   "13"
            "tasks"       "'killwith 2 pistol' 'rescue 1'"
        }
        "de_cbble_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Splinter Outcast Worm"
            "minEnemies"  "6"
            "threshold"   "13"
            "tasks"       "'killwith 2 shield' 'winfast 90'"
        }

        // - late -------------------------------------------
        "de_aztec_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Splinter Outcast Worm"
            "minEnemies"  "7"
            "threshold"   "16"
            "tasks"       "'kill 3' 'killwith 2 awp' 'winfast 90'"
        }
        "cs_downed_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Outcast Splinter Worm"
            "minEnemies"  "7"
            "threshold"   "16"
            "tasks"       "'kill 3' 'killwith 2 famas' 'rescue 1'"
        }
        "de_airstrip_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Worm Outcast Splinter"
            "minEnemies"  "7"
            "threshold"   "16"
            "tasks"       "'kill 3' 'killwith 2 shield'"
        }

        // - end --------------------------------------------
        "de_piranesi_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Splinter Outcast Worm"
            "minEnemies"  "7"
            "threshold"   "19"
            "tasks"       "'kill 5' 'killwith 3 aug'"
        }
        "de_fastline_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Worm Outcast Splinter"
            "minEnemies"  "7"
            "threshold"   "19"
            "tasks"       "'kill 6' 'killwith 3 SMG'"
        }
        "de_torn_cz"
        {
            "bots"        "Weasel Lunatic Crackpot Madman Rat Screech Outcast Worm Splinter"
            "minEnemies"  "7"
            "threshold"   "19"
            "tasks"       "'kill 7' 'killwith 3 sniper'"
        }
    }
}`;

export const normalModeVdfExample = `
"CareerGame"
{
    "InitialPoints"             "2"
    "MatchWins"                 "3"
    "MatchWinBy"                "2"
    "Characters"                "Cooper Floyd Kenny Morris Stanley Vern Quincy Gus Ben Eddie Kent Oscar Phil Leon Pete Roger Maverick Cole Igor Larry Ray Sam Travis Kirk Alex Brent Jake Tex Lou Ace Rooster Eagle Sandman Barney Steel Duke Bear"

	// CostAvailability: for each bot point cost, specify the number of reputation points needed to hire him.
	// If a value is not present or 0, that cost and higher are assumed to be always available.
	"CostAvailability"
	{
		"1"						"1"
		"2"						"6"
		"3"						"10"
		"4"						"15"
		"5"						"99"
	}

    "Maps"
    {
        // Maps are in triplets
        // 'minEnemies' defines the minimum number of enemies of the map (from the 'bots' entry, left to right)
        // 'threshold' defines the Reputation Point value above which one enemy is added for every additional RP until we run out of bots on the 'bots' line

        // A note on tasks:
        //
        // tasks are one of the following:
        //    kill         <N> [survive | inarow]
        //    killwith     <N> <weapon> [survive | inarow]
        //    killblind    <N> [survive | inarow]
        //    winfast      <S> [survive | inarow]
        //    headshot     <N> [survive | inarow]
        //    headshotwith <N> <weapon> [survive | inarow]
        //    killall
        //    rescue       <N> [survive | inarow]
        //    rescue 4
        //    injure       <N> [survive | inarow]
        //    injurewith   <N> <weapon> [survive | inarow]
        //
        // tasks can contain a numeric value (# of kills, # of seconds, etc)
        // tasks can contain a weapon name or weapon classname (for the killwith and headshotwith tasks)
        // you can add "survive" so the player must survive to the end of the round to complete the task
        // you can add "inarow" so the player must complete the task N times without dying (across round boundaries)
        // group words of a task with '.  I.e. 'kill 3'
        //
        // Weapon names/classes are:
        //    scout
        //    xm1014
        //    mac10
        //    aug
        //    ump45
        //    sg550
        //    galil
        //    famas
        //    awp
        //    mp5
        //    m249
        //    m3
        //    m4a1
        //    tmp
        //    sg552
        //    ak47
        //    p90
        //    shield
        //    weapon
        //    knife
        //    grenade (text is singular)
        //    hegren  (text is plural, but the behavior is the same)
        //    pistol
        //    SMG
        //    machinegun
        //    shotgun
        //    rifle
        //    sniper
        //    fn57
        //    elites

        // - start ------------------------------------------
        "de_dust_cz"
        {
            "bots"        "Madman Rat Screech Worm Splinter Maniac"
            "minEnemies"  "3"
            "threshold"   "2"
            "tasks"       "'kill 5' 'kill 1 survive' 'winfast 75'"
        }
        "cs_office_cz"
        {
            "bots"        "Madman Rat Screech Worm Freak Maniac"
            "minEnemies"  "3"
            "threshold"   "2"
            "tasks"       "'kill 5' 'killwith 1 SMG' 'rescue 4'"
        }
        "de_prodigy_cz"
        {
            "bots"        "Madman Rat Screech Worm Splinter Maniac"
            "minEnemies"  "3"
            "threshold"   "2"
            "tasks"       "'kill 5' 'killwith 1 sniper' 'winfast 75'"
        }

        // - early -------------------------------------------
        "de_tides_cz"
        {
            "bots"        "Madman Rat Screech Worm Splinter Maniac"
            "minEnemies"  "5"
            "threshold"   "7"
            "tasks"       "'kill 6' 'killwith 1 shotgun' 'winfast 75'"
        }
        "cs_italy_cz"
        {
            "bots"        "Madman Rat Screech Worm Splinter Maniac"
            "minEnemies"  "5"
            "threshold"   "7"
            "tasks"       "'kill 6' 'killwith 2 sniper' 'rescue 4'"
        }
        "de_inferno_cz"
        {
            "bots"        "Madman Rat Screech Worm Psycho Maniac"
            "minEnemies"  "5"
            "threshold"   "7"
            "tasks"       "'kill 6' 'killwith 1 aug' 'killwith 1 pistol'"
        }

        // - halfway -----------------------------------------
        "de_dust2_cz"
        {
            "bots"        "Rat Screech Worm Freak Maniac Psycho"
            "minEnemies"  "6"
            "threshold"   "10"
            "tasks"       "'kill 7' 'killwith 2 sg550 inarow' 'winfast 75'"
        }
        "cs_militia_cz"
        {
            "bots"        "Madman Rat Screech Worm Freak Maniac Psycho"
            "minEnemies"  "7"
            "threshold"   "10"
            "tasks"       "'kill 7' 'killwith 2 shotgun inarow' 'rescue 4'"
        }
        "de_stadium_cz"
        {
            "bots"        "Rat Screech Worm Freak Maniac Splinter"
            "minEnemies"  "6"
            "threshold"   "10"
            "tasks"       "'kill 7' 'killwith 3 aug' 'winfast 75'"
        }

        // - halfway ----------------------------------------
        "de_chateau_cz"
        {
            "bots"        "Rat Screech Worm Freak Maniac Psycho"
            "minEnemies"  "6"
            "threshold"   "13"
            "tasks"       "'kill 8' 'killwith 3 m249'"
        }
        "cs_havana_cz"
        {
            "bots"        "Rat Screech Worm Freak Maniac Psycho"
            "minEnemies"  "6"
            "threshold"   "13"
            "tasks"       "'kill 8' 'killwith 3 deagle' 'rescue 4'"
        }
        "de_cbble_cz"
        {
            "bots"        "Rat Screech Worm Freak Maniac Psycho"
            "minEnemies"  "6"
            "threshold"   "13"
            "tasks"       "'kill 8' 'killwith 3 shield' 'winfast 75'"
        }

        // - late -------------------------------------------
        "de_aztec_cz"
        {
            "bots"        "Screech Splinter Freak Maniac Psycho Rebel Fiend Vandal"
            "minEnemies"  "7"
            "threshold"   "16"
            "tasks"       "'kill 9' 'killwith 3 awp' 'winfast 75'"
        }
        "cs_downed_cz"
        {
            "bots"        "Rat Screech Worm Freak Maniac Psycho Rebel"
            "minEnemies"  "7"
            "threshold"   "16"
            "tasks"       "'kill 9' 'killwith 3 famas' 'rescue 4'"
        }
        "de_airstrip_cz"
        {
            "bots"        "Rat Screech Worm Freak Maniac Psycho Vandal"
            "minEnemies"  "7"
            "threshold"   "16"
            "tasks"       "'kill 9' 'killwith 3 shield'"
        }

        // - end --------------------------------------------
        "de_piranesi_cz"
        {
            "bots"        "Screech Worm Freak Maniac Psycho Rebel Fiend Vandal"
            "minEnemies"  "8"
            "threshold"   "19"
            "tasks"       "'kill 10' 'killwith 3 aug'"
        }
        "de_fastline_cz"
        {
            "bots"        "Screech Worm Freak Maniac Psycho Rebel Fiend Vandal"
            "minEnemies"  "8"
            "threshold"   "19"
            "tasks"       "'kill 12' 'killwith 3 p90'"
        }
        "de_torn_cz"
        {
            "bots"        "Rat Screech Worm Freak Maniac Psycho Rebel Fiend Vandal"
            "minEnemies"  "8"
            "threshold"   "19"
            "tasks"       "'kill 15' 'killwith 4 awp'"
        }
    }
}`;

export const hardModeVdfExample = `
"CareerGame"
{
    "InitialPoints"             "6"
    "MatchWins"                 "3"
    "MatchWinBy"                "2"
    "Characters"                "Cooper Floyd Kenny Morris Stanley Vern Quincy Gus Ben Eddie Kent Oscar Phil Leon Pete Roger Maverick Cole Igor Larry Ray Sam Travis Kirk Alex Brent Jake Tex Lou Ace Rooster Eagle Sandman Barney Steel Duke Bear"

    // CostAvailability: for each bot point cost, specify the number of reputation points needed to hire him.
    // If a value is not present or 0, that cost and higher are assumed to be always available.
    "CostAvailability"
    {
	"1"						"1"
	"2"						"6"
	"3"						"6"
	"4"						"12"
	"5"						"18"
    }

   "Maps"
    {
        // Maps are in triplets
        // 'minEnemies' defines the minimum number of enemies of the map (from the 'bots' entry, left to right)
        // 'threshold' defines the Reputation Point value above which one enemy is added for every additional RP until we run out of bots on the 'bots' line

        // A note on tasks:
        //
        // tasks are one of the following:
        //    kill         <N> [survive | inarow]
        //    killwith     <N> <weapon> [survive | inarow]
        //    killblind    <N> [survive | inarow]
        //    winfast      <S> [survive | inarow]
        //    headshot     <N> [survive | inarow]
        //    headshotwith <N> <weapon> [survive | inarow]
        //    killall
        //    rescue       <N> [survive | inarow]
        //    rescueall
        //    injure       <N> [survive | inarow]
        //    injurewith   <N> <weapon> [survive | inarow]
        //
        // tasks can contain a numeric value (# of kills, # of seconds, etc)
        // tasks can contain a weapon name or weapon classname (for the killwith and headshotwith tasks)
        // you can add "survive" so the player must survive to the end of the round to complete the task
        // you can add "inarow" so the player must complete the task N times without dying (across round boundaries)
        // group words of a task with '.  I.e. 'kill 3'
        //
        // Weapon names/classes are:
        //    scout
        //    xm1014
        //    mac10
        //    aug
        //    ump45
        //    sg550
        //    galil
        //    famas
        //    awp
        //    mp5
        //    m249
        //    m3
        //    m4a1
        //    tmp
        //    sg552
        //    ak47
        //    p90
        //    shield
        //    weapon
        //    knife
        //    grenade (text is singular)
        //    hegren  (text is plural, but the behavior is the same)
        //    pistol
        //    SMG
        //    machinegun
        //    shotgun
        //    rifle
        //    sniper
        //    fn57
        //    elites

        // - start ------------------------------------------
        "de_dust_cz"
        {
            "bots"        "Freak Maniac Psycho Rebel Fiend Vandal"
            "minEnemies"  "5"
            "threshold"   "8"
            "tasks"       "'kill 7' 'kill 2 survive' 'winfast 60'"
            "FriendlyFire"  "1"
        }
        "cs_office_cz"
        {
            "bots"        "Freak Maniac Psycho Rebel Fiend Vandal"
            "minEnemies"  "5"
            "threshold"   "8"
            "tasks"       "'kill 7' 'killwith 2 mp5 survive' 'rescueall'"
            "FriendlyFire"  "1"
        }
        "de_prodigy_cz"
        {
            "bots"        "Freak Maniac Psycho Rebel Fiend Vandal"
            "minEnemies"  "5"
            "threshold"   "8"
            "tasks"       "'kill 7' 'killwith 2 scout survive' 'winfast 60'"
            "FriendlyFire"  "1"
        }

        // - early -------------------------------------------
        "de_tides_cz"
        {
            "bots"        "Freak Rebel Fiend Vandal Razor Bandit Raider Nails"
            "minEnemies"  "6"
            "threshold"   "11"
            "tasks"       "'kill 8' 'killwith 5 xm1014' 'winfast 60'"
            "FriendlyFire"  "1"
        }
        "cs_italy_cz"
        {
            "bots"        "Maniac Rebel Fiend Vandal Razor Bandit Raider Nails"
            "minEnemies"  "6"
            "threshold"   "11"
            "tasks"       "'killwith 4 deagle' 'killwith 4 awp' 'rescueall'"
            "FriendlyFire"  "1"
        }
        "de_inferno_cz"
        {
            "bots"        "Freak Rebel Fiend Vandal Razor Bandit Raider Fanatic"
            "minEnemies"  "6"
            "threshold"   "11"
            "tasks"       "'kill 8' 'killwith 3 aug inarow' 'killblind 1'"
            "FriendlyFire"  "1"
        }

        // - halfway ----------------------------------------
        "de_dust2_cz"
        {
            "bots"        "Rebel Fiend Vandal Razor Bandit Raider Blade"
            "minEnemies"  "7"
            "threshold"   "14"
            "tasks"       "'kill 9' 'killwith 3 sg550 inarow' 'winfast 60 survive'"
            "FriendlyFire"  "1"
        }
        "cs_militia_cz"
        {
            "bots"        "Rebel Fiend Vandal Razor Bandit Raider Nails"
            "minEnemies"  "7"
            "threshold"   "14"
            "tasks"       "'kill 9' 'killblind 1 survive' 'rescueall'"
            "FriendlyFire"  "1"
        }
        "de_stadium_cz"
        {
            "bots"        "Rebel Fiend Vandal Razor Bandit Raider Blade"
            "minEnemies"  "7"
            "threshold"   "14"
            "tasks"       "'kill 9' 'killwith 3 aug inarow' 'winfast 60 survive'"
            "FriendlyFire"  "1"
        }

        // - halfway ----------------------------------------
        "de_chateau_cz"
        {
            "bots"        "Rebel Fiend Vandal Razor Bandit Raider Blade"
            "minEnemies"  "7"
            "threshold"   "17"
            "tasks"       "'kill 10' 'killblind 1 survive' 'killwith 3 m249 inarow'"
            "FriendlyFire"  "1"
        }
        "cs_havana_cz"
        {
            "bots"        "Rebel Fiend Vandal Razor Bandit Raider Blade"
            "minEnemies"  "7"
            "threshold"   "17"
            "tasks"       "'kill 10' 'killwith 1 knife' 'rescueall'"
            "FriendlyFire"  "1"
        }
        "de_cbble_cz"
        {
            "bots"        "Rebel Fiend Vandal Razor Bandit Raider Blade"
            "minEnemies"  "7"
            "threshold"   "17"
            "tasks"       "'kill 10' 'killwith 3 shield inarow' 'winfast 60 survive'"
            "FriendlyFire"  "1"
        }

        // - late -------------------------------------------
        "de_aztec_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Crow Fanatic"
            "minEnemies"  "8"
            "threshold"   "20"
            "tasks"       "'kill 12' 'killwith 5 scout' 'winfast 60 survive'"
            "FriendlyFire"  "1"
        }
        "cs_downed_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Fanatic Panther"
            "minEnemies"  "7"
            "threshold"   "20"
            "tasks"       "'kill 12' 'killwith 5 famas' 'rescueall'"
            "FriendlyFire"  "1"
        }
        "de_airstrip_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Fanatic Panther"
            "minEnemies"  "7"
            "threshold"   "20"
            "tasks"       "'kill 12' 'killwith 5 shield' 'killwith 2 sg550 survive'"
            "FriendlyFire"  "1"
        }

        // - end --------------------------------------------
        "de_piranesi_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Fanatic Panther Wolfhound"
            "minEnemies"  "8"
            "threshold"   "23"
            "tasks"       "'kill 15' 'killwith 5 aug' 'killwith 2 pistol inarow'"
            "FriendlyFire"  "1"
        }
        "de_fastline_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Fanatic Panther Hyena"
            "minEnemies"  "8"
            "threshold"   "23"
            "tasks"       "'kill 17' 'killwith 5 p90' 'killblind 1 survive'"
            "FriendlyFire"  "1"
        }
        "de_torn_cz"
        {
            "bots"        "Bandit Raider Nails Crank Cutter Crow Fanatic Wolfhound"
            "minEnemies"  "8"
            "threshold"   "23"
            "tasks"       "'kill 20' 'killwith 5 awp' 'killwith 2 deagle inarow'"
            "FriendlyFire"  "1"
        }
    }
}`;

export const expertModeExample = `
"CareerGame"
{
    "InitialPoints"             "8"
    "MatchWins"                 "3"
    "MatchWinBy"                "2"
    "Characters"                "Cooper Floyd Kenny Morris Stanley Vern Quincy Gus Ben Eddie Kent Oscar Phil Leon Pete Roger Maverick Cole Igor Larry Ray Sam Travis Kirk Alex Brent Jake Tex Lou Ace Rooster Eagle Sandman Barney Steel Duke Bear"

    // CostAvailability: for each bot point cost, specify the number of reputation points needed to hire him.
    // If a value is not present or 0, that cost and higher are assumed to be always available.
    "CostAvailability"
    {
	"1"						"1"
	"2"						"1"
	"3"						"1"
	"4"						"1"
	"5"						"18"
    }

   "Maps"
    {
        // Maps are in triplets
        // 'minEnemies' defines the minimum number of enemies of the map (from the 'bots' entry, left to right)
        // 'threshold' defines the Reputation Point value above which one enemy is added for every additional RP until we run out of bots on the 'bots' line

        // A note on tasks:
        //
        // tasks are one of the following:
        //    kill         <N> [survive | inarow]
        //    killwith     <N> <weapon> [survive | inarow]
        //    killblind    <N> [survive | inarow]
        //    winfast      <S> [survive | inarow]
        //    headshot     <N> [survive | inarow]
        //    headshotwith <N> <weapon> [survive | inarow]
        //    killall
        //    rescue       <N> [survive | inarow]
        //    rescueall
        //    injure       <N> [survive | inarow]
        //    injurewith   <N> <weapon> [survive | inarow]
        //
        // tasks can contain a numeric value (# of kills, # of seconds, etc)
        // tasks can contain a weapon name or weapon classname (for the killwith and headshotwith tasks)
        // you can add "survive" so the player must survive to the end of the round to complete the task
        // you can add "inarow" so the player must complete the task N times without dying (across round boundaries)
        // group words of a task with '.  I.e. 'kill 3'
        //
        // Weapon names/classes are:
        //    scout
        //    xm1014
        //    mac10
        //    aug
        //    ump45
        //    sg550
        //    galil
        //    famas
        //    awp
        //    mp5
        //    m249
        //    m3
        //    m4a1
        //    tmp
        //    sg552
        //    ak47
        //    p90
        //    shield
        //    weapon
        //    knife
        //    grenade (text is singular)
        //    hegren  (text is plural, but the behavior is the same)
        //    pistol
        //    SMG
        //    machinegun
        //    shotgun
        //    rifle
        //    sniper
        //    fn57
        //    elites

        // - start ------------------------------------------
        "de_dust_cz"
        {
            "bots"        "Rebel Fiend Vandal Razor Bandit Raider Blade"
            "minEnemies"  "5"
            "threshold"   "10"
            "tasks"       "'kill 10' 'kill 2 survive' 'winfast 45'"
            "FriendlyFire"  "1"
        }
        "cs_office_cz"
        {
            "bots"        "Rebel Fiend Vandal Razor Bandit Raider Blade"
            "minEnemies"  "5"
            "threshold"   "10"
            "tasks"       "'kill 10' 'killwith 2 mp5 survive' 'rescueall'"
            "FriendlyFire"  "1"
        }
        "de_prodigy_cz"
        {
            "bots"        "Rebel Fiend Vandal Razor Bandit Raider Blade"
            "minEnemies"  "5"
            "threshold"   "10"
            "tasks"       "'kill 10' 'killwith 2 scout survive' 'winfast 45'"
            "FriendlyFire"  "1"
        }
 
        // - early -------------------------------------------
        "de_tides_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Fanatic Crow"
            "minEnemies"  "5"
            "threshold"   "13"
            "tasks"       "'kill 12' 'killwith 5 xm1014' 'winfast 45'"
            "FriendlyFire"  "1"
        }
        "cs_italy_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Fanatic Crow"
            "minEnemies"  "5"
            "threshold"   "13"
            "tasks"       "'killwith 6 fn57' 'killwith 6 awp' 'rescueall'"
            "FriendlyFire"  "1"
        }
        "de_inferno_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Fanatic Crow"
            "minEnemies"  "6"
            "threshold"   "13"
            "tasks"       "'kill 12' 'killwith 3 aug inarow' 'killblind 1 survive'"
            "FriendlyFire"  "1"
        }

        // - halfway ----------------------------------------
        "de_dust2_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Fanatic Crow"
            "minEnemies"  "6"
            "threshold"   "16"
            "tasks"       "'kill 14' 'killwith 3 sg550 inarow' 'winfast 45 survive'"
            "FriendlyFire"  "1"
        }
        "cs_militia_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Fanatic Crow"
            "minEnemies"  "6"
            "threshold"   "16"
            "tasks"       "'kill 14' 'killblind 1 survive' 'rescueall'"
            "FriendlyFire"  "1"
        }
        "de_stadium_cz"
        {
            "bots"        "Razor Bandit Raider Nails Crank Cutter Fanatic Crow"
            "minEnemies"  "6"
            "threshold"   "16"
            "tasks"       "'kill 14' 'killwith 3 aug inarow' 'winfast 45 survive'"
            "FriendlyFire"  "1"
        }

        // - halfway ----------------------------------------
        "de_chateau_cz"
        {
            "bots"        "Nails Crank Cutter Fanatic Hyena Wolfhound Panther Crow"
            "minEnemies"  "7"
            "threshold"   "19"
            "tasks"       "'kill 16' 'killblind 1 survive' 'killwith 3 m249 inarow'"
            "FriendlyFire"  "1"
        }
        "cs_havana_cz"
        {
            "bots"        "Nails Crank Cutter Fanatic Hyena Wolfhound Panther Crow"
            "minEnemies"  "7"
            "threshold"   "19"
            "tasks"       "'kill 16' 'killwith 1 knife' 'rescueall'"
            "FriendlyFire"  "1"
        }
        "de_cbble_cz"
        {
            "bots"        "Nails Crank Cutter Fanatic Hyena Wolfhound Panther Crow"
            "minEnemies"  "7"
            "threshold"   "19"
            "tasks"       "'kill 16' 'killwith 3 shield inarow' 'winfast 45 survive'"
            "FriendlyFire"  "1"
        }

        // - late -------------------------------------------
        "de_aztec_cz"
        {
            "bots"        "Nails Cutter Fanatic Hyena Wolfhound Panther Crow Jackal"
            "minEnemies"  "8"
            "threshold"   "22"
            "tasks"       "'kill 18' 'killwith 5 scout' 'winfast 45 survive'"
            "FriendlyFire"  "1"
        }
        "cs_downed_cz"
        {
            "bots"        "Crank Cutter Fanatic Hyena Wolfhound Panther Crow Spider"
            "minEnemies"  "8"
            "threshold"   "22"
            "tasks"       "'kill 18' 'killwith 5 famas' 'rescueall'"
            "FriendlyFire"  "1"
        }
        "de_airstrip_cz"
        {
            "bots"        "Nails Crank Fanatic Hyena Hammer Panther Crow Wolfhound"
            "minEnemies"  "8"
            "threshold"   "22"
            "tasks"       "'kill 18' 'killwith 5 shield' 'killwith 2 sg550 survive'"
            "FriendlyFire"  "1"
        }

        // - end --------------------------------------------
        "de_piranesi_cz"
        {
            "bots"        "Hyena Wolfhound Panther Crow Jackal Hawk Spider Snake"
            "minEnemies"  "8"
            "threshold"   "25"
            "tasks"       "'kill 20' 'killwith 5 aug' 'killblind 1 survive'"
            "FriendlyFire"  "1"
        }
        "de_fastline_cz"
        {
            "bots"        "Hyena Wolfhound Panther Crow Jackal Hawk Spider Snake"
            "minEnemies"  "8"
            "threshold"   "25"
            "tasks"       "'kill 22' 'killwith 5 p90' 'killwith 1 grenade survive'"
            "FriendlyFire"  "1"
        }
        "de_torn_cz"
        {
            "bots"        "Fanatic Hyena Wolfhound Panther Crow Jackal Hawk Spider Snake"
            "minEnemies"  "8"
            "threshold"   "25"
            "tasks"       "'kill 25' 'killwith 5 awp' 'killwith 1 knife survive'"
            "FriendlyFire"  "1"
        }
    }
}`;
