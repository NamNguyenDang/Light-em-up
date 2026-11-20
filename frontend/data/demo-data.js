// 100 deterministic fictional profiles for offline density testing; no real personal data.
const samples=[
  {
    "id": "sample-1",
    "nickname": "A new chapter",
    "city": "Stockholm",
    "lit": true,
    "message": "One application at a time. Today, showing up is enough.",
    "status": "Looking for an opportunity",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-2",
    "nickname": "North star",
    "city": "Umeå",
    "lit": true,
    "message": "I’m learning to rest without giving up. You’re allowed to do that too.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-3",
    "nickname": "Small steps",
    "city": "Göteborg",
    "lit": false,
    "message": "Taking a breath this week. Still here, still cheering for you.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-4",
    "nickname": "A brighter morning",
    "city": "Malmö",
    "lit": true,
    "message": "I started a part-time role. Wishing you a kind next chapter, whatever it looks like.",
    "status": "Found work",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-5",
    "nickname": "Hopeful neighbour 005",
    "city": "Stockholm",
    "lit": true,
    "message": "You deserve kindness during the waiting, too.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-6",
    "nickname": "Hopeful neighbour 006",
    "city": "Stockholm",
    "lit": true,
    "message": "A quiet week does not erase your progress.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-7",
    "nickname": "Hopeful neighbour 007",
    "city": "Stockholm",
    "lit": true,
    "message": "Today I asked for help. That was my small step.",
    "status": "Looking for an opportunity",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-8",
    "nickname": "Hopeful neighbour 008",
    "city": "Stockholm",
    "lit": false,
    "message": "Some days the next step is simply a walk and a fresh start.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-9",
    "nickname": "Hopeful neighbour 009",
    "city": "Stockholm",
    "lit": true,
    "message": "Your experience still matters, even when the inbox is quiet.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-10",
    "nickname": "Hopeful neighbour 010",
    "city": "Stockholm",
    "lit": true,
    "message": "An internship, a few hours, a new beginning — every path counts.",
    "status": "Looking for an opportunity",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-11",
    "nickname": "Hopeful neighbour 011",
    "city": "Stockholm",
    "lit": true,
    "message": "One application at a time. Today, showing up is enough.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-12",
    "nickname": "Hopeful neighbour 012",
    "city": "Stockholm",
    "lit": true,
    "message": "I’m learning to rest without giving up. You’re allowed to do that too.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-13",
    "nickname": "Hopeful neighbour 013",
    "city": "Stockholm",
    "lit": false,
    "message": "Taking a breath this week. Still here, still cheering for you.",
    "status": "Found work",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-14",
    "nickname": "Hopeful neighbour 014",
    "city": "Stockholm",
    "lit": true,
    "message": "I started a part-time role. Wishing you a kind next chapter, whatever it looks like.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-15",
    "nickname": "Hopeful neighbour 015",
    "city": "Stockholm",
    "lit": true,
    "message": "You deserve kindness during the waiting, too.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-16",
    "nickname": "Hopeful neighbour 016",
    "city": "Stockholm",
    "lit": true,
    "message": "A quiet week does not erase your progress.",
    "status": "Looking for an opportunity",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-17",
    "nickname": "Hopeful neighbour 017",
    "city": "Stockholm",
    "lit": true,
    "message": "Today I asked for help. That was my small step.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-18",
    "nickname": "Hopeful neighbour 018",
    "city": "Stockholm",
    "lit": false,
    "message": "Some days the next step is simply a walk and a fresh start.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-19",
    "nickname": "Hopeful neighbour 019",
    "city": "Stockholm",
    "lit": true,
    "message": "Your experience still matters, even when the inbox is quiet.",
    "status": "Looking for an opportunity",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-20",
    "nickname": "Hopeful neighbour 020",
    "city": "Stockholm",
    "lit": true,
    "message": "An internship, a few hours, a new beginning — every path counts.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-21",
    "nickname": "Hopeful neighbour 021",
    "city": "Stockholm",
    "lit": true,
    "message": "One application at a time. Today, showing up is enough.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-22",
    "nickname": "Hopeful neighbour 022",
    "city": "Stockholm",
    "lit": true,
    "message": "I’m learning to rest without giving up. You’re allowed to do that too.",
    "status": "Found work",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-23",
    "nickname": "Hopeful neighbour 023",
    "city": "Stockholm",
    "lit": false,
    "message": "Taking a breath this week. Still here, still cheering for you.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-24",
    "nickname": "Hopeful neighbour 024",
    "city": "Stockholm",
    "lit": true,
    "message": "I started a part-time role. Wishing you a kind next chapter, whatever it looks like.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-25",
    "nickname": "Hopeful neighbour 025",
    "city": "Stockholm",
    "lit": true,
    "message": "You deserve kindness during the waiting, too.",
    "status": "Looking for an opportunity",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-26",
    "nickname": "Hopeful neighbour 026",
    "city": "Stockholm",
    "lit": true,
    "message": "A quiet week does not erase your progress.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-27",
    "nickname": "Hopeful neighbour 027",
    "city": "Stockholm",
    "lit": true,
    "message": "Today I asked for help. That was my small step.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-28",
    "nickname": "Hopeful neighbour 028",
    "city": "Stockholm",
    "lit": false,
    "message": "Some days the next step is simply a walk and a fresh start.",
    "status": "Looking for an opportunity",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-29",
    "nickname": "Hopeful neighbour 029",
    "city": "Stockholm",
    "lit": true,
    "message": "Your experience still matters, even when the inbox is quiet.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-30",
    "nickname": "Hopeful neighbour 030",
    "city": "Stockholm",
    "lit": true,
    "message": "An internship, a few hours, a new beginning — every path counts.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-31",
    "nickname": "Hopeful neighbour 031",
    "city": "Stockholm",
    "lit": true,
    "message": "One application at a time. Today, showing up is enough.",
    "status": "Found work",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-32",
    "nickname": "Hopeful neighbour 032",
    "city": "Stockholm",
    "lit": true,
    "message": "I’m learning to rest without giving up. You’re allowed to do that too.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-33",
    "nickname": "Hopeful neighbour 033",
    "city": "Stockholm",
    "lit": false,
    "message": "Taking a breath this week. Still here, still cheering for you.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-34",
    "nickname": "Hopeful neighbour 034",
    "city": "Göteborg",
    "lit": true,
    "message": "I started a part-time role. Wishing you a kind next chapter, whatever it looks like.",
    "status": "Looking for an opportunity",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-35",
    "nickname": "Hopeful neighbour 035",
    "city": "Göteborg",
    "lit": true,
    "message": "You deserve kindness during the waiting, too.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-36",
    "nickname": "Hopeful neighbour 036",
    "city": "Göteborg",
    "lit": true,
    "message": "A quiet week does not erase your progress.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-37",
    "nickname": "Hopeful neighbour 037",
    "city": "Göteborg",
    "lit": true,
    "message": "Today I asked for help. That was my small step.",
    "status": "Looking for an opportunity",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-38",
    "nickname": "Hopeful neighbour 038",
    "city": "Göteborg",
    "lit": false,
    "message": "Some days the next step is simply a walk and a fresh start.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-39",
    "nickname": "Hopeful neighbour 039",
    "city": "Göteborg",
    "lit": true,
    "message": "Your experience still matters, even when the inbox is quiet.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-40",
    "nickname": "Hopeful neighbour 040",
    "city": "Göteborg",
    "lit": true,
    "message": "An internship, a few hours, a new beginning — every path counts.",
    "status": "Found work",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-41",
    "nickname": "Hopeful neighbour 041",
    "city": "Göteborg",
    "lit": true,
    "message": "One application at a time. Today, showing up is enough.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-42",
    "nickname": "Hopeful neighbour 042",
    "city": "Göteborg",
    "lit": true,
    "message": "I’m learning to rest without giving up. You’re allowed to do that too.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-43",
    "nickname": "Hopeful neighbour 043",
    "city": "Göteborg",
    "lit": false,
    "message": "Taking a breath this week. Still here, still cheering for you.",
    "status": "Looking for an opportunity",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-44",
    "nickname": "Hopeful neighbour 044",
    "city": "Göteborg",
    "lit": true,
    "message": "I started a part-time role. Wishing you a kind next chapter, whatever it looks like.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-45",
    "nickname": "Hopeful neighbour 045",
    "city": "Göteborg",
    "lit": true,
    "message": "You deserve kindness during the waiting, too.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-46",
    "nickname": "Hopeful neighbour 046",
    "city": "Göteborg",
    "lit": true,
    "message": "A quiet week does not erase your progress.",
    "status": "Looking for an opportunity",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-47",
    "nickname": "Hopeful neighbour 047",
    "city": "Göteborg",
    "lit": true,
    "message": "Today I asked for help. That was my small step.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-48",
    "nickname": "A neighbour taking one small hopeful step at a time",
    "city": "Göteborg",
    "lit": false,
    "message": "Your experience still matters, even when the inbox is quiet. You deserve kindness during the waiting, too. Today I asked for help. That was my small step.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-49",
    "nickname": "Hopeful neighbour 049",
    "city": "Göteborg",
    "lit": true,
    "message": "Your experience still matters, even when the inbox is quiet.",
    "status": "Found work",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-50",
    "nickname": "Hopeful neighbour 050",
    "city": "Göteborg",
    "lit": true,
    "message": "An internship, a few hours, a new beginning — every path counts.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-51",
    "nickname": "Hopeful neighbour 051",
    "city": "Malmö",
    "lit": true,
    "message": "One application at a time. Today, showing up is enough.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-52",
    "nickname": "Hopeful neighbour 052",
    "city": "Malmö",
    "lit": true,
    "message": "I’m learning to rest without giving up. You’re allowed to do that too.",
    "status": "Looking for an opportunity",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-53",
    "nickname": "Hopeful neighbour 053",
    "city": "Malmö",
    "lit": false,
    "message": "Taking a breath this week. Still here, still cheering for you.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-54",
    "nickname": "Hopeful neighbour 054",
    "city": "Malmö",
    "lit": true,
    "message": "I started a part-time role. Wishing you a kind next chapter, whatever it looks like.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-55",
    "nickname": "Hopeful neighbour 055",
    "city": "Malmö",
    "lit": true,
    "message": "You deserve kindness during the waiting, too.",
    "status": "Looking for an opportunity",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-56",
    "nickname": "Hopeful neighbour 056",
    "city": "Malmö",
    "lit": true,
    "message": "A quiet week does not erase your progress.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-57",
    "nickname": "Hopeful neighbour 057",
    "city": "Malmö",
    "lit": true,
    "message": "Today I asked for help. That was my small step.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-58",
    "nickname": "Hopeful neighbour 058",
    "city": "Malmö",
    "lit": false,
    "message": "Some days the next step is simply a walk and a fresh start.",
    "status": "Found work",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-59",
    "nickname": "Hopeful neighbour 059",
    "city": "Malmö",
    "lit": true,
    "message": "Your experience still matters, even when the inbox is quiet.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-60",
    "nickname": "Hopeful neighbour 060",
    "city": "Malmö",
    "lit": true,
    "message": "An internship, a few hours, a new beginning — every path counts.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-61",
    "nickname": "Hopeful neighbour 061",
    "city": "Malmö",
    "lit": true,
    "message": "One application at a time. Today, showing up is enough.",
    "status": "Looking for an opportunity",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-62",
    "nickname": "Hopeful neighbour 062",
    "city": "Uppsala",
    "lit": true,
    "message": "I’m learning to rest without giving up. You’re allowed to do that too.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-63",
    "nickname": "Hopeful neighbour 063",
    "city": "Uppsala",
    "lit": false,
    "message": "Taking a breath this week. Still here, still cheering for you.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-64",
    "nickname": "Hopeful neighbour 064",
    "city": "Uppsala",
    "lit": true,
    "message": "I started a part-time role. Wishing you a kind next chapter, whatever it looks like.",
    "status": "Looking for an opportunity",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-65",
    "nickname": "Hopeful neighbour 065",
    "city": "Uppsala",
    "lit": true,
    "message": "You deserve kindness during the waiting, too.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-66",
    "nickname": "Hopeful neighbour 066",
    "city": "Uppsala",
    "lit": true,
    "message": "A quiet week does not erase your progress.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-67",
    "nickname": "Hopeful neighbour 067",
    "city": "Uppsala",
    "lit": true,
    "message": "Today I asked for help. That was my small step.",
    "status": "Found work",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-68",
    "nickname": "Hopeful neighbour 068",
    "city": "Uppsala",
    "lit": false,
    "message": "Some days the next step is simply a walk and a fresh start.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-69",
    "nickname": "Hopeful neighbour 069",
    "city": "Uppsala",
    "lit": true,
    "message": "Your experience still matters, even when the inbox is quiet.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-70",
    "nickname": "Hopeful neighbour 070",
    "city": "Uppsala",
    "lit": true,
    "message": "An internship, a few hours, a new beginning — every path counts.",
    "status": "Looking for an opportunity",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-71",
    "nickname": "Hopeful neighbour 071",
    "city": "Uppsala",
    "lit": true,
    "message": "One application at a time. Today, showing up is enough.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-72",
    "nickname": "Hopeful neighbour 072",
    "city": "Lund",
    "lit": true,
    "message": "I’m learning to rest without giving up. You’re allowed to do that too.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-73",
    "nickname": "Hopeful neighbour 073",
    "city": "Lund",
    "lit": false,
    "message": "Taking a breath this week. Still here, still cheering for you.",
    "status": "Looking for an opportunity",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-74",
    "nickname": "Hopeful neighbour 074",
    "city": "Lund",
    "lit": true,
    "message": "I started a part-time role. Wishing you a kind next chapter, whatever it looks like.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-75",
    "nickname": "Hopeful neighbour 075",
    "city": "Lund",
    "lit": true,
    "message": "You deserve kindness during the waiting, too.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-76",
    "nickname": "Hopeful neighbour 076",
    "city": "Lund",
    "lit": true,
    "message": "A quiet week does not erase your progress.",
    "status": "Found work",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-77",
    "nickname": "Hopeful neighbour 077",
    "city": "Lund",
    "lit": true,
    "message": "Today I asked for help. That was my small step.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-78",
    "nickname": "Hopeful neighbour 078",
    "city": "Luleå",
    "lit": false,
    "message": "Some days the next step is simply a walk and a fresh start.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-79",
    "nickname": "Hopeful neighbour 079",
    "city": "Östersund",
    "lit": true,
    "message": "Your experience still matters, even when the inbox is quiet.",
    "status": "Looking for an opportunity",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-80",
    "nickname": "Hopeful neighbour 080",
    "city": "Kiruna",
    "lit": true,
    "message": "An internship, a few hours, a new beginning — every path counts.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-81",
    "nickname": "Hopeful neighbour 081",
    "city": "Västerås",
    "lit": true,
    "message": "One application at a time. Today, showing up is enough.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-82",
    "nickname": "Hopeful neighbour 082",
    "city": "Örebro",
    "lit": true,
    "message": "I’m learning to rest without giving up. You’re allowed to do that too.",
    "status": "Looking for an opportunity",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-83",
    "nickname": "Hopeful neighbour 083",
    "city": "Linköping",
    "lit": false,
    "message": "Taking a breath this week. Still here, still cheering for you.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-84",
    "nickname": "Hopeful neighbour 084",
    "city": "Norrköping",
    "lit": true,
    "message": "I started a part-time role. Wishing you a kind next chapter, whatever it looks like.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-85",
    "nickname": "Hopeful neighbour 085",
    "city": "Helsingborg",
    "lit": true,
    "message": "You deserve kindness during the waiting, too.",
    "status": "Found work",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-86",
    "nickname": "Hopeful neighbour 086",
    "city": "Jönköping",
    "lit": true,
    "message": "A quiet week does not erase your progress.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-87",
    "nickname": "Hopeful neighbour 087",
    "city": "Gävle",
    "lit": true,
    "message": "Today I asked for help. That was my small step.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-88",
    "nickname": "Hopeful neighbour 088",
    "city": "Borås",
    "lit": false,
    "message": "Some days the next step is simply a walk and a fresh start.",
    "status": "Looking for an opportunity",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-89",
    "nickname": "Hopeful neighbour 089",
    "city": "Sundsvall",
    "lit": true,
    "message": "Your experience still matters, even when the inbox is quiet.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-90",
    "nickname": "Hopeful neighbour 090",
    "city": "Halmstad",
    "lit": true,
    "message": "An internship, a few hours, a new beginning — every path counts.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-91",
    "nickname": "Hopeful neighbour 091",
    "city": "Karlstad",
    "lit": true,
    "message": "One application at a time. Today, showing up is enough.",
    "status": "Looking for an opportunity",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-92",
    "nickname": "Hopeful neighbour 092",
    "city": "Växjö",
    "lit": true,
    "message": "I’m learning to rest without giving up. You’re allowed to do that too.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-93",
    "nickname": "Hopeful neighbour 093",
    "city": "Kalmar",
    "lit": false,
    "message": "Taking a breath this week. Still here, still cheering for you.",
    "status": "",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-94",
    "nickname": "Hopeful neighbour 094",
    "city": "Falun",
    "lit": true,
    "message": "I started a part-time role. Wishing you a kind next chapter, whatever it looks like.",
    "status": "Found work",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-95",
    "nickname": "Hopeful neighbour 095",
    "city": "Skellefteå",
    "lit": true,
    "message": "You deserve kindness during the waiting, too.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-96",
    "nickname": "Hopeful neighbour 096",
    "city": "Nyköping",
    "lit": true,
    "message": "A quiet week does not erase your progress.",
    "status": "",
    "seeking": "",
    "sample": true
  },
  {
    "id": "sample-97",
    "nickname": "Hopeful neighbour 097",
    "city": "Visby",
    "lit": true,
    "message": "Today I asked for help. That was my small step.",
    "status": "Looking for an opportunity",
    "seeking": "Full-time",
    "sample": true
  },
  {
    "id": "sample-98",
    "nickname": "Hopeful neighbour 098",
    "city": "Trollhättan",
    "lit": false,
    "message": "Some days the next step is simply a walk and a fresh start.",
    "status": "",
    "seeking": "Part-time",
    "sample": true
  },
  {
    "id": "sample-99",
    "nickname": "Hopeful neighbour 099",
    "city": "Eskilstuna",
    "lit": true,
    "message": "Your experience still matters, even when the inbox is quiet.",
    "status": "",
    "seeking": "Internship",
    "sample": true
  },
  {
    "id": "sample-100",
    "nickname": "Hopeful neighbour 100",
    "city": "Karlskrona",
    "lit": true,
    "message": "An internship, a few hours, a new beginning — every path counts.",
    "status": "Looking for an opportunity",
    "seeking": "",
    "sample": true
  }
];

// Fixed fictional update times for the sample-card UI, not real people/activity.
// Do not use Date.now(): reloading must not manufacture fresh board updates.
samples.forEach((person,index)=>{person.updated_at=new Date(Date.UTC(2026,10,1,12)-index*60*60*1000).toISOString();});
