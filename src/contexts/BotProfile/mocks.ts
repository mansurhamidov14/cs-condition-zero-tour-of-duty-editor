export const botProfileExample = `
//----------------------------------------------------------------------------
// BotCampaignProfile.db
// Author: Michael S. Booth, Turtle Rock Studios (www.turtlerockstudios.com)
//
// This database defines all of the bot "personalities" that are used
// in the CZ Campaign.
//


//----------------------------------------------------------------------------
//
// All profiles begin with this data and overwrite their own
//
Default
	Skill = 50
	Aggression = 50
	ReactionTime = 0.3
	AttackDelay = 0
	Teamwork = 75
	WeaponPreference = none
	Cost = 0
	Difficulty = NORMAL
	VoicePitch = 100
	Skin = 0
End

//----------------------------------------------------------------------------
//
// These templates inherit from Default and override with their values
// The name of the template defines a type that is used by individual bot profiles
//

// weapon preference templates
Template Rifle
	WeaponPreference = m4a1
	WeaponPreference = ak47
	WeaponPreference = famas
	WeaponPreference = galil
	WeaponPreference = mp5
End

Template RifleT
	WeaponPreference = ak47
	WeaponPreference = m4a1
	WeaponPreference = galil
	WeaponPreference = famas
	WeaponPreference = mp5
End

Template Punch
	WeaponPreference = aug
	WeaponPreference = sg552
	WeaponPreference = famas
	WeaponPreference = galil
	WeaponPreference = mp5
End

Template Sniper
	WeaponPreference = awp
	WeaponPreference = sg550
	WeaponPreference = g3sg1
	WeaponPreference = scout
	WeaponPreference = famas
	WeaponPreference = galil
	WeaponPreference = mp5
End

Template Power
	WeaponPreference = m249
	WeaponPreference = xm1014
	WeaponPreference = m3
	WeaponPreference = famas
	WeaponPreference = galil
	WeaponPreference = mp5
End

Template Shotgun
	WeaponPreference = xm1014
	WeaponPreference = m3
	WeaponPreference = famas
	WeaponPreference = galil
	WeaponPreference = mp5
End

Template Shield
	WeaponPreference = shield
	WeaponPreference = m4a1			// in case shield is disallowed
	WeaponPreference = ak47
	WeaponPreference = famas
	WeaponPreference = galil
	WeaponPreference = mp5
End

Template Spray
	WeaponPreference = p90
	WeaponPreference = tmp
	WeaponPreference = mac10
	WeaponPreference = mp5
End


// skill templates
Template Elite
	Skill = 100
	Aggression = 100
	ReactionTime = 0.2
	Cost = 4
	Difficulty = EXPERT
	VoicePitch = 85
End

Template Expert
	Skill = 90
	Aggression = 90
	ReactionTime = 0.2
	Cost = 4
	Difficulty = EXPERT
	VoicePitch = 88
End

Template VeryHard
	Skill = 80
	Aggression = 80
	ReactionTime = 0.25
	Cost = 3
	Difficulty = HARD
	VoicePitch = 92
End

Template Hard
	Skill = 75
	Aggression = 75
	ReactionTime = 0.25
	Cost = 3
	Difficulty = HARD
	VoicePitch = 94
End

Template Tough
	Skill = 60
	Aggression = 60
	ReactionTime = 0.3		// 0.2 - 0.4
	AttackDelay = 0.35		// 0.3 - 0.4
	Cost = 2
	Difficulty = NORMAL+HARD
	VoicePitch = 96
End

Template Normal
	Skill = 50
	Aggression = 50
	ReactionTime = 0.4		// 0.2 - 0.4
	AttackDelay = 0.7			// 0.3 - 0.4
	Cost = 2
	Difficulty = NORMAL
End

Template Fair
	Skill = 25
	Aggression = 30
	ReactionTime = 0.4		// 0.25 - 0.5
	AttackDelay = 1.0			// 1.0 - 1.5f
	Cost = 1
	Difficulty = EASY+NORMAL
	VoicePitch = 105
End

Template Easy
	Skill = 0
	Aggression = 20
	ReactionTime = 0.5		// 0.25 - 0.5
	AttackDelay = 1.5			// 1.0 - 1.5f
	Cost = 1
	Difficulty = EASY
	VoicePitch = 110
End


//--------------------------------------------------------------------------------------------------------
// 
// Teammates for career mode
//

//-------------------------------------------
// Cost 1

Fair Cooper
	Cost = 1

	WeaponPreference = mp5
	WeaponPreference = tmp

	WeaponPreference = fn57
	WeaponPreference = deagle
	WeaponPreference = p228

	Teamwork = 100
	Aggression = 0

	Skin = 3
	VoicePitch = 115
End

Fair Floyd
	Cost = 1

	WeaponPreference = ump45
	WeaponPreference = mp5
	WeaponPreference = tmp

	WeaponPreference = fn57
	WeaponPreference = deagle
	WeaponPreference = p228

	Teamwork = 50
	Aggression = 50

	Skin = 2
	VoicePitch = 113
End

Fair Kenny
	Cost = 1

	WeaponPreference = m3
	WeaponPreference = mp5
	WeaponPreference = tmp

	WeaponPreference = deagle
	WeaponPreference = p228

	Teamwork = 75
	Aggression = 75

	Skin = 2
	VoicePitch = 120
End

Fair Morris
	Cost = 1

	WeaponPreference = p90
	WeaponPreference = ump45
	WeaponPreference = mp5

	WeaponPreference = deagle

	Teamwork = 50
	Aggression = 50

	Skin = 4
	VoicePitch = 111
End

Easy Stanley
	Cost = 1

	WeaponPreference = p90
	WeaponPreference = mp5
	WeaponPreference = tmp

	WeaponPreference = deagle

	Teamwork = 0
	Aggression = 100

	Skin = 1
	VoicePitch = 90
End

Easy Vern
	Cost = 1

	WeaponPreference = mp5

	Teamwork = 100
	Aggression = 25

	Skin = 3
	VoicePitch = 103
End

Easy Quincy
	Cost = 1

	WeaponPreference = ump45
	WeaponPreference = mp5
	WeaponPreference = tmp

	Teamwork = 75
	Aggression = 50

	Skin = 1
	VoicePitch = 98
End

Easy Gus
	Cost = 1

	WeaponPreference = tmp

	WeaponPreference = p228

	Teamwork = 50
	Aggression = 100

	Skin = 4
	VoicePitch = 107
End

//-------------------------------------------
// Cost 2

Tough Ben
	Cost = 2

	WeaponPreference = famas
	WeaponPreference = p90
	WeaponPreference = ump45
	WeaponPreference = mp5
	WeaponPreference = tmp

	WeaponPreference = fn57
	WeaponPreference = deagle
	WeaponPreference = p228


	Teamwork = 50
	Aggression = 75

	Skin = 4
	VoicePitch = 86
End

Tough Eddie
	Cost = 2

	WeaponPreference = scout
	WeaponPreference = tmp

	WeaponPreference = fn57

	Teamwork = 0
	Aggression = 0

	Skin = 2
	VoicePitch = 115
End

Tough Kent
	Cost = 2

	WeaponPreference = famas
	WeaponPreference = mp5

	WeaponPreference = deagle

	Teamwork = 25
	Aggression = 90

	Skin = 1
	VoicePitch = 95
End

Tough Oscar
	Cost = 2

	WeaponPreference = famas
	WeaponPreference = p90
	WeaponPreference = mp5


	Teamwork = 90
	Aggression = 25

	Skin = 3
	VoicePitch = 90
End

Tough Phil
	Cost = 2

	WeaponPreference = mp5
	WeaponPreference = tmp

	WeaponPreference = deagle
	WeaponPreference = p228

	Teamwork = 75
	Aggression = 50

	Skin = 2
	VoicePitch = 100
End

Normal Leon
	Cost = 2

	WeaponPreference = tmp

	WeaponPreference = fn57

	Teamwork = 90
	Aggression = 50

	Skin = 1
	VoicePitch = 105
End

Normal Pete
	Cost = 2

	WeaponPreference = p90
	WeaponPreference = ump45
	WeaponPreference = mp5
	WeaponPreference = tmp

	WeaponPreference = deagle

	Teamwork = 75
	Aggression = 75

	Skin = 3
	VoicePitch = 110
End

Normal Roger
	Cost = 2

	WeaponPreference = xm1014
	WeaponPreference = m3
	WeaponPreference = ump45
	WeaponPreference = mp5
	WeaponPreference = tmp

	Teamwork = 50
	Aggression = 90

	Skin = 4
	VoicePitch = 88
End



//-------------------------------------------
// Cost 3

Elite+RifleT Maverick
	Cost = 3							// cheaper because he doesn't listen at all

	Teamwork = 0
	Aggression = 100

	Skin = 3
	VoicePitch = 98
End

Hard+Power Cole
	Cost = 3

	Teamwork = 75
	Aggression = 75

	Skin = 4
	VoicePitch = 88
End

Hard+Spray Igor
	Cost = 3

	Teamwork = 90
	Aggression = 25

	Skin = 1
	VoicePitch = 120
End

Hard+Rifle Larry
	Cost = 3

	Teamwork = 50
	Aggression = 90

	Skin = 2
	VoicePitch = 94
End

Hard+Shotgun Ray
	Cost = 3

	Teamwork = 75
	Aggression = 100

	Skin = 3
	VoicePitch = 110
End

Hard+Rifle Sam
	Cost = 3

	Teamwork = 90
	Aggression = 50

	SKin = 1
	VoicePitch = 90
End

Hard+Shield Travis
	Cost = 3

	Teamwork = 75
	Aggression = 75

	Skin = 4
	VoicePitch = 100
End

Normal+Sniper Kirk
	Cost = 3

	Aggression = 0
	Teamwork = 25

	VoicePitch = 105
	Skin = 2
End



//-------------------------------------------
// Cost 4

Hard+Sniper Alex
	Cost = 4

	Aggression = 0
	Teamwork = 80

	VoicePitch = 100
	Skin = 1
End

Expert+Shield Brent
	Cost = 4

	Aggression = 100
	Teamwork = 100

	VoicePitch = 90
	Skin = 4
End

Expert+Punch Jake
	Cost = 4

	Aggression = 50
	Teamwork = 80

	VoicePitch = 87
	Skin = 1
End

Expert+RifleT Tex
	Cost = 4

	Aggression = 80
	Teamwork = 50

	VoicePitch = 92
	Skin = 3
End

Expert+Power Lou
	Cost = 4

	Aggression = 75
	Teamwork = 80

	VoicePitch = 82
	Skin = 4
End

Expert+Rifle Ace
	Cost = 4

	Aggression = 50
	Teamwork = 25

	Skin = 1
	VoicePitch = 95
End

Expert+Spray Rooster
	Cost = 4

	Aggression = 75
	Teamwork = 80

	Skin = 2
	VoicePitch = 105
End

//-------------------------------------------
// Cost 5

Elite+Sniper Eagle
	Cost = 5

	Aggression = 50
	Teamwork = 100

	Skin = 4
	VoicePitch = 108
End

Elite+Spray Sandman
	Cost = 5

	Aggression = 100
	Teamwork = 100

	Skin = 4
	VoicePitch = 84
End

Elite+Rifle Barney
	Cost = 5

	Aggression = 100
	Teamwork = 100

	Skin = 2
	VoicePitch = 100
End

Elite+RifleT Steel
	Cost = 5

	Aggression = 100
	Teamwork = 100

	Skin = 2
	VoicePitch = 90
End

Elite+Punch Duke
	Cost = 5

	Aggression = 100
	Teamwork = 100

	Skin = 1
	VoicePitch = 92
End

Elite+Power Bear
	Cost = 5

	Aggression = 100
	Teamwork = 100

	Skin = 3
	VoicePitch = 82
End


//--------------------------------------------------------------------------------------------------------
//
// Terrorist enemies
// Reserve skin #3 for snipers
//

Easy Weasel
	WeaponPreference = scout
	Aggression = 0
	Skin = 3
End

Easy Lunatic
	WeaponPreference = m4a1    // kind of a hack - give him a weapon he cant buy so he uses pistols
	WeaponPreference = elites
	Aggression = 100
	Skin = 4
End

Easy Crackpot
	WeaponPreference = ump45
	Aggression = 50
	Skin = 2
End

Easy Outcast
	WeaponPreference = mac10
	Aggression = 100
	Skin = 2
End

//-------------------------------------------

Fair Madman
	WeaponPreference = mac10
	Aggression = 100
	Skin = 1
End

Fair Rat
	WeaponPreference = mp5
	Aggression = 0
	Skin = 4
End

Fair Screech
	WeaponPreference = p90
	Aggression = 50
End

Fair Worm
	WeaponPreference = mp5
	Aggression = 50
	Skin = 4
End

Fair Splinter
	WeaponPreference = scout
	Aggression = 25
	Skin = 3
End


//-------------------------------------------

Normal+RifleT Freak
	Aggression = 50
	Skin = 2
End

Normal+Spray Maniac
	Aggression = 100
	Skin = 4
End

Normal+Sniper Psycho
	Aggression = 25
	Skin = 3
End

//-------------------------------------------

Tough+RifleT Rebel
	Aggression = 50
	Skin = 4
End

Tough+Rifle Fiend
	Aggression = 100
	Skin = 1
End

Tough+Rifle Vandal
	Aggression = 0
	Skin = 2
End

//-------------------------------------------

Hard+Sniper Razor
	Aggression = 25
	Skin = 3
End

Hard+Spray Bandit
	Aggression = 0
	Skin = 4
End

Hard+Rifle Raider
	Aggression = 50
	Skin = 1
End

Hard+RifleT Blade
	Aggression = 100
	Skin = 2
End

//-------------------------------------------

VeryHard+Sniper Nails
	Aggression = 25
	Skin = 3
End

VeryHard+Power Hammer
	Aggression = 50
	Skin = 4
End

VeryHard+Power Crank
	Aggression = 0
	Skin = 2
End

VeryHard+RifleT Cutter
	Aggression = 50
	Skin = 1
End

VeryHard+RifleT Fanatic
	Aggression = 100
	Skin = 2
End

//-------------------------------------------

Expert+Spray Hyena
	Aggression = 50
	Skin = 2
End

Expert+Power Wolfhound
	Aggression = 100
	Skin = 4
End

Expert+Rifle Panther
	Aggression = 100
	Skin = 1
End

Expert+Sniper Crow
	Aggression = 50
	Skin = 3
End

//-------------------------------------------

Elite+Spray Jackal
	Aggression = 100
	Teamwork = 95
	Skin = 4
End

Elite+Sniper Hawk
	Aggression = 50
	Teamwork = 50
	Skin = 3
End

Elite+RifleT Spider
	Aggression = 0
	Teamwork = 95
	Skin = 1
End

Elite+RifleT Snake
	Aggression = 100
	Teamwork = 5
	Skin = 2
End
`;