const Goal = require("./Goal");
const Match = require("./Match");
const Player = require("./Player");
const Rule = require("./Rule");
const Team = require("./Team");
const Ranking = require("./Ranking");

Match.associate({ Team, Goal });
Team.associate({ Match, Player, Ranking });
Player.associate({ Team, Goal });
Goal.associate({ Match, Player });
Ranking.associate({ Team });

module.exports = { Match, Goal, Player, Rule, Team, Ranking };
