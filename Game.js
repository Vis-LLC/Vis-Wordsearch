/*
    Copyright (C) 2022 Vis LLC. - All Rights Reserved

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/*
    Vis Sudoku - Source code can be found on SourceForge.net
*/
(function () {
    var Game = {
        StatIncrementCalls: [],
        Boards: {
    
        },
        State: null,
        CurrentBoard: null,
        BoardObject: {
        },
        ControlsDiv: null,
        StartTime: null,
        StartDuration: null,
        SavedGamesDiv: null,
        SavedGamesTable: null,
        TimerDiv: null,
        GameDiv: null,
        FailedDiv: null,
        SuccessDiv: null,
        OptionsDiv: null,
        BoardDiv: null,
        BoardField: null,
        BoardView: null,
        Selected: null,
        WordSets: {
            /*
            Computers: ["COMPUTER", "MONITOR", "MOUSE", "HARDDRIVE", "KEYBOARD", "CABLE", "MEMORY", "RAM", "ROM"],
            */
            States: ["ALABAMA", "ALASKA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORADO", "CONNECTICUT", "DELAWARE", "FLORIDA", "GEORGIA", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA", "KANSAS", "KENTUCKY", "LOUISIANA", "MAINE", "MARYLAND", "MASSACHUSETTS", "MICHIGAN", "MINNESOTA", "MISSISSIPPI", "MISSOURI", "MONTANA", "NEBRASKA", "NEVADA", "NEWHAMPSHIRE", "NEWJERSEY", "NEWMEXICO", "NEWYORK", "NORTHCAROLINA", "NORTHDAKOTA", "OHIO", "OKLAHOMA", "OREGON", "PENNSYLVANIA", "RHODEISLAND", "SOUTHCAROLINA", "SOUTHDAKOTA", "TENNESSEE", "TEXAS", "UTAH", "VERMONT", "VIRGINIA", "WASHINGTON", "WESTVIRGINIA", "WISCONSIN", "WYOMING"],
            Presidents: ["GEORGEWASHINGTON", "JOHNADAMS", "THOMASJEFFERSON", "JAMESMADISON", "JAMESMONROE", "JOHNQUINCYADAMS", "ANDREWJACKSON", "MARTINVANBUREN", "WILLIAMHENRYHARRISON", "JOHNTYLER", "JAMESKPOLK", "ZACHARYTAYLOR", "MILLARDFILLMORE", "FRANKLINPIERCE", "JAMESBUCHANAN", "ABRAHAMLINCOLN", "ANDREWJOHNSON", "ULYSSESSGRANT", "RUTHERFORDBHAYES", "JAMESGARFIELD", "CHESTERAARTHUR", "GROVERCLEVEAND", "BENJAMINHARRISON", "GROVERCLEVELAND", "WILLIAMMCKINLEY", "THEODOREROOSEVELT", "WILLIAMHOWARDTAFT", "WOODROWWILSON", "WARRENGHARDING", "CALVINCOOLIDGE", "HERBERTHOOVER", "FRANKLINDROOSEVELT", "HARRYSTRUMAN", "DWIGHTDEISENHOWER", "JOHNFKENNEDY", "LYNDONBJOHNSON", "RICHARDMNIXON", "GERALDRFORD", "JAMESCARTER", "RONALDREAGAN", "GEORGEHWBUSH", "WILLIAMJCLINTON", "GEORGEWBUSH", "BARACKOBAMA", "DONALDTRUMP", "JOSEPHRBIDENJR"],
            Capitols: ["MONTGOMERY", "JUNEAU", "PHOENIX", "LITTLEROCK", "SACRAMENTO", "DENVER", "HARTFORD", "DOVER", "TALLAHASSEE", "ATLANTA", "HONOLULU", "BOISE", "SPRINGFIELD", "INDIANAPOLIS", "DESMOINES", "TOPEKA", "FRANKFORT", "BATONROUGE", "AUGUSTA", "ANNAPOLIS", "BOSTON", "LANSING", "SAINTPAUL", "JACKSON", "JEFFERSONCITY", "HELENA", "LINCOLN", "CARSONCITY", "CONCORD", "TRENTON", "SANTAFE", "ALBANY", "RALEIGH", "BISMARCK", "COLUMBUS", "OKLAHOMACITY", "SALEM", "HARRISBURG", "PROVIDENCE", "COLUMBIA", "PIERRE", "NASHVILLE", "AUSTIN", "SALTLAKECITY", "MONTPELIER", "RICHMOND", "OLYMPIA", "CHARLESTON", "MADISON", "CHEYENNE"],
            Norse: ["AEGIR", "BALDUR", "BESTLA", "BORR", "BRAGI", "BURI", "DAGUR", "DELLING", "EIR", "EOSTRE", "ELLI", "FORSETI", "FREYJA", "FREYR", "FRIGG", "FULLA", "GEFJUN", "GERD", "HEL", "HEIMDALLUR", "HERMODUR", "HLIN", "HODR", "HAEIR", "IDUNN", "JORD", "KVASIR", "LOFN", "LOKI", "MAGNI", "MANI", "MIMIR", "NANNA", "NERPUS", "NJORDUR", "NOTT", "ODINN", "ODUR", "PORR", "RAN", "SAGA", "SIF", "SIGYN", "SJOFN", "SKADI", "SKOLL", "SNOTRA", "SOL", "THOR", "THRUER", "TYR", "ULLR", "VALI", "VANIR", "VAR", "VE", "VIDARR", "VILI", "VOR", "YGGDRASIL"],
            Egyptian: ["AKER", "AMUN", "AMUNET", "ANHUR", "ANUBIS", "ANUKET", "ATEN", "ATUM", "BASTET", "BAT", "BENNU", "GEB", "HAPI", "HATHOR", "HATMEHIT", "HEH", "HEQET", "HESAT", "HORUS", "IMENTET", "ISIS", "KEK", "KHEPRI", "KHNUM", "KHONSU", "MAAHES", "MAAT", "MENHIT", "MONTU", "MUT", "NEFERTUM", "NEITH", "NEKHBET", "NEMTY", "NEPER", "NEPHTHYS", "NEPIT", "NU", "NUT", "OSIRIS", "PAKHET", "PTAH", "RA", "RA", "RENENUTET", "SATET", "SEKHMET", "SET", "SHU", "SOBEK", "SOPDU", "TATENEN", "TEFNUT", "THOTH", "WADJET", "WADJWER", "WOSRET"],
            Roman: ["APOLLO", "AURORA", "BACCHUS", "BELLONA", "CAELUS", "CERES", "CUPID", "CYBELE", "DIANA", "FAUNUS", "FLORA", "FORTUNA", "JANUS", "JUNO", "JUPITER", "MARS", "MERCURY", "MINERVA", "NEPTUNE", "NYX", "PLUTO", "PROSERPINA", "POMONA", "SATURN", "SPES", "TERRA", "VENUS", "VERITAS", "VESTA", "VULCAN"],
            Greek: ["ACHLYS", "AETHER", "AION", "ANANKE", "ANYTOS", "APHRODITE", "APOLLO", "ARES", "ARTEMIS", "ASTERIA", "ASTRAEUS", "ATHENA", "ATLAS", "CHAOS", "CHRONOS", "COEUS", "CRIUS", "CRONUS", "DEMETER", "DIONE", "DIONYSUS", "EOS", "EPIMETHEUS", "EREBUS", "EROS", "GAIA", "HADES", "HELIOS", "HEMERA", "HEPHAESTUS", "HERA", "HERMES", "HESTIA", "HYPERION", "HYPNOS", "IAPETUS", "LELANTOS", "LETO", "MENOETIUS", "METIS", "MNEMOSYNE", "NEMESIS", "NESOI", "NYX", "OCEANUS", "OUREA", "PALLAS", "PERSES", "PHANES", "PHOEBE", "PONTUS", "POSEIDON", "PROMETHEUS", "RHEA", "SELENE", "STYX", "SYCEUS", "TARTARUS", "TETHYS", "THALASSA", "THANATOS", "THEIA", "THEMIS", "URANUS", "ZEUS"],
            "Design Patterns": ["ABSTRACTFACTORY", "ADAPTER", "BRIDGE", "BUILDER", "CHAINOFRESPONSIBILITY", "COMMAND", "COMPOSITE", "DECORATOR", "FACADE", "FACTORYMETHOD", "FLYWEIGHT", "INTERPRETER", "ITERATOR", "MEDIATOR", "MEMENTO", "OBSERVER", "PROTOTYPE", "PROXY", "SINGLETON", "STATE", "STRATEGY", "TEMPLATEMETHOD", "VISITOR"],
            Countries: [ "ABKHAZIA", "AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANTIGUAANDBARBUDA", "ARGENTINA", "ARMENIA", "ARTSAKH", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BHUTAN", "BOLIVIA", "BOSNIA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURKINAFASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPEVERDE", "CENTRALAFRICANREPUBLIC", "CHAD", "CHILE", "CHINA", "COLOMBIA", "COMOROS", "CONGO", "COOKISLANDS", "COSTARICA", "CROATIA", "CUBA", "CYPRUS", "CZECHREPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICANREPUBLIC", "DONETSK", "EASTTIMOR", "ECUADOR", "EGYPT", "ELSALVADOR", "EQUATORIALGUINEA", "ERITREA", "ESTONIA", "ESWATINI", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GREECE", "GRENADA", "GUATEMALA", "GUINEA", "GUINEA-BISSAU", "GUYANA", "HAITI", "HERZEGOVINA", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISRAEL", "ITALY", "IVORYCOAST", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KOSOVO", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUHANSK", "LUXEMBOURG", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALLISLANDS", "MAURITANIA", "MAURITIUS", "MEXICO", "MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MOROCCO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", "NEPAL", "NETHERLANDS", "NEWZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NIUE", "NORTHERNCYPRUS", "NORTHKOREA", "NORTHMACEDONIA", "NORWAY", "OMAN", "PAKISTAN", "PALAU", "PALESTINE", "PANAMA", "PAPUANEWGUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "QATAR", "ROMANIA", "RUSSIA", "RWANDA", "SAHRAWIARABDEMOCRATICREPUBLIC", "SAINTKITTSANDNEVIS", "SAINTLUCIA", "SAINTVINCENTANDTHEGRENADINES", "SAMOA", "SANMARINO", "SAOTOMEANDPRINCIPE", "SAUDIARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRALEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOLOMONISLANDS", "SOMALIA", "SOMALILAND", "SOUTHAFRICA", "SOUTHKOREA", "SOUTHOSSETIA", "SOUTHSUDAN", "SPAIN", "SRILANKA", "SUDAN", "SURINAME", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TONGA", "TRANSNISTRIA", "TRINIDADANDTOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TUVALU", "UGANDA", "UKRAINE", "UNITEDARABEMIRATES", "UNITEDKINGDOM", "UNITEDSTATES", "URUGUAY", "UZBEKISTAN", "VANUATU", "VATICANCITY", "VENEZUELA", "VIETNAM", "YEMEN", "ZAMBIA", "ZIMBABWE"],
        },
        Puzzles: {
            /*
            Computers: { 
                "_map": [
                    ["V", "P", "S", "I", "E", "F", "Y", "U", "W", "H", "P", "S", "P", "G", "U", "N", "L", "M", "J", "C", "X", "S", "X", "C", "T"],
                    ["Q", "T", "N", "H", "M", "T", "V", "I", "A", "D", "I", "Y", "R", "O", "M", "E", "M", "C", "R", "L", "I", "M", "D", "B", "R"],
                    ["M", "Y", "B", "D", "J", "D", "A", "R", "A", "V", "I", "L", "H", "Q", "G", "G", "J", "O", "E", "M", "Z", "F", "V", "O", "F"],
                    ["T", "O", "Y", "F", "Q", "O", "D", "M", "K", "R", "M", "S", "M", "L", "A", "M", "T", "C", "T", "C", "L", "Y", "W", "Y", "I"],
                    ["H", "X", "G", "M", "Y", "D", "K", "J", "W", "J", "Y", "M", "Q", "K", "L", "I", "Z", "J", "E", "Q", "W", "U", "U", "C", "R"],
                    ["D", "J", "I", "Z", "R", "H", "K", "W", "M", "H", "L", "P", "R", "K", "N", "K", "X", "A", "D", "X", "H", "Y", "O", "A", "Y"],
                    ["F", "H", "M", "I", "Y", "F", "J", "Y", "F", "H", "G", "W", "V", "O", "K", "E", "D", "T", "G", "Q", "X", "H", "R", "S", "E"],
                    ["F", "E", "V", "D", "L", "G", "T", "V", "A", "B", "Z", "S", "M", "E", "P", "Y", "F", "W", "U", "O", "R", "D", "F", "A", "G"],
                    ["U", "E", "L", "A", "N", "O", "E", "I", "A", "X", "B", "T", "L", "R", "M", "B", "S", "H", "Z", "H", "U", "M", "N", "E", "B"],
                    ["W", "E", "S", "R", "V", "C", "I", "V", "F", "Y", "M", "N", "K", "L", "V", "O", "E", "Q", "H", "D", "H", "J", "K", "L", "E"],
                    ["S", "Y", "U", "A", "C", "R", "G", "X", "N", "D", "M", "F", "Z", "Y", "T", "A", "R", "S", "E", "G", "R", "Y", "K", "X", "X"],
                    ["Q", "T", "Z", "O", "M", "R", "P", "F", "T", "M", "L", "E", "Z", "U", "D", "R", "R", "F", "U", "V", "N", "D", "P", "L", "B"],
                    ["J", "R", "J", "G", "J", "S", "L", "U", "A", "H", "R", "O", "K", "I", "G", "D", "M", "Q", "Q", "O", "U", "B", "V", "M", "K"],
                    ["E", "X", "E", "D", "L", "T", "X", "L", "W", "D", "D", "C", "H", "V", "M", "J", "H", "U", "N", "S", "M", "E", "Y", "H", "P"],
                    ["B", "C", "V", "T", "Y", "X", "O", "M", "S", "L", "Y", "P", "A", "Y", "M", "E", "L", "B", "A", "C", "C", "K", "B", "N", "Y"],
                    ["C", "Q", "Y", "V", "U", "U", "K", "U", "Q", "Z", "W", "T", "E", "D", "G", "L", "N", "X", "N", "G", "G", "N", "N", "Q", "J"],
                    ["O", "R", "I", "R", "B", "P", "Q", "K", "Z", "Z", "V", "M", "S", "E", "E", "O", "E", "E", "H", "I", "A", "D", "B", "N", "C"],
                    ["N", "M", "G", "U", "A", "R", "M", "T", "X", "T", "C", "A", "R", "H", "G", "E", "H", "K", "B", "B", "U", "C", "A", "T", "N"],
                    ["Q", "V", "J", "O", "A", "B", "P", "O", "C", "Q", "U", "C", "B", "I", "Z", "B", "K", "V", "X", "V", "S", "H", "B", "V", "M"],
                    ["Y", "N", "B", "D", "K", "V", "M", "N", "C", "E", "D", "F", "J", "R", "E", "Y", "Q", "B", "Z", "L", "T", "A", "Q", "S", "Z"],
                    ["E", "H", "J", "V", "W", "Y", "A", "G", "R", "A", "M", "H", "F", "D", "B", "I", "R", "O", "Y", "J", "Y", "L", "V", "O", "Z"],
                    ["L", "B", "H", "Q", "G", "N", "B", "U", "N", "F", "D", "L", "A", "T", "S", "B", "V", "I", "O", "Y", "Q", "T", "A", "Q", "Y"],
                    ["Y", "D", "Q", "T", "H", "L", "E", "R", "Y", "S", "K", "A", "P", "L", "I", "V", "W", "J", "G", "L", "S", "K", "J", "Z", "N"],
                    ["R", "P", "G", "Q", "W", "E", "F", "H", "D", "X", "G", "F", "X", "B", "O", "X", "V", "C", "F", "Z", "O", "U", "C", "F", "Z"],
                    ["W", "P", "C", "V", "O", "X", "Y", "L", "Z", "I", "Y", "I", "C", "Y", "R", "E", "T", "V", "U", "B", "Q", "V", "V", "G", "T"]
                ],
                "_words": {
                    "h": {
                        "COMPUTER": { "_x": 8, "_y": 19, "_directionX": -1, "_directionY": -1 },
                        "MONITOR": { "_x": 12, "_y": 7, "_directionX": 1, "_directionY": -1 },
                        "MOUSE": { "_x": 20, "_y": 13, "_directionX": -1, "_directionY": -1 },
                        "HARDDRIVE": { "_x": 9, "_y": 0, "_directionX": -1, "_directionY": 1 },
                        "KEYBOARD": { "_x": 15, "_y": 5, "_directionX": 0, "_directionY": 1 },
                        "CABLE": { "_x": 19, "_y": 14, "_directionX": -1, "_directionY": 0 },
                        "MEMORY": { "_x": 16, "_y": 1, "_directionX": -1, "_directionY": 0 },
                        "RAM": { "_x": 8, "_y": 20, "_directionX": 1, "_directionY": 0 },
                        "ROM": { "_x": 16, "_y": 10, "_directionX": -1, "_directionY": -1 } 
                    } 
                } 
            },
            */
            States: {
                "_map": [
                    ["J","B","Z","J","V","A","I","N","A","V","L","Y","S","N","N","E","P","H","V","X","B","U","Y","N","J","S","D","X","R","Q"],
                    ["M","D","N","C","G","R","Q","W","A","Y","S","X","Y","X","E","D","S","T","Y","T","V","N","Q","N","F","W","Q","N","D","M"],
                    ["M","Q","B","P","A","T","G","R","N","A","S","T","K","H","I","P","L","X","A","V","T","S","H","E","D","E","L","E","S","W"],
                    ["Q","J","D","F","N","D","K","V","A","T","K","A","J","E","L","S","W","W","L","D","U","W","Z","F","E","S","Y","C","D","H"],
                    ["O","H","I","O","W","G","T","G","I","O","U","U","I","I","Q","P","S","G","A","E","C","A","N","F","R","T","B","J","O","J"],
                    ["S","F","U","Y","J","P","B","D","S","K","S","G","E","A","A","G","Z","K","S","L","I","S","Y","V","X","V","X","E","M","M"],
                    ["H","D","D","J","F","K","U","A","I","A","I","N","X","Z","A","E","N","A","K","A","T","H","B","X","X","I","D","P","C","I"],
                    ["U","A","G","L","V","L","S","M","U","D","N","I","Z","Y","N","O","U","T","A","W","C","I","B","D","L","R","W","A","M","P"],
                    ["T","N","R","X","V","N","P","A","O","H","C","M","P","M","A","R","F","O","N","A","E","N","N","L","X","G","L","O","L","P"],
                    ["G","Z","K","U","A","X","E","S","L","T","B","O","Y","I","T","G","O","K","D","R","N","G","Q","M","N","I","C","T","P","I"],
                    ["Q","L","Y","K","L","X","J","S","Y","R","R","Y","H","O","N","I","D","A","F","E","N","T","T","T","F","N","B","N","S","S"],
                    ["A","V","E","P","P","S","N","A","E","O","N","W","F","W","O","A","A","D","G","E","O","O","J","O","C","I","K","O","B","S"],
                    ["N","I","R","M","R","I","D","C","N","N","O","B","A","A","M","J","R","H","J","Z","C","N","R","P","H","A","A","M","I","I"],
                    ["O","R","I","N","H","V","N","H","R","M","G","X","U","A","H","B","O","T","A","U","T","N","A","T","E","R","X","R","N","S"],
                    ["Z","G","H","E","O","X","A","U","N","X","E","E","R","M","B","X","L","U","E","S","I","Z","H","G","H","T","C","E","J","S"],
                    ["I","I","S","I","D","W","L","S","D","C","R","T","A","P","R","L","O","O","V","A","L","P","M","Z","I","V","K","V","A","I"],
                    ["R","N","P","H","E","Q","Y","E","E","O","O","N","Y","D","Q","Q","C","S","Z","G","Z","M","U","C","W","H","Y","X","G","M"],
                    ["A","I","M","C","I","P","R","T","J","H","X","E","K","M","I","A","D","K","S","Z","Z","K","B","V","M","A","C","L","W","U"],
                    ["P","A","A","K","S","M","A","T","R","N","X","B","C","I","C","R","T","B","I","L","L","I","N","O","I","S","J","I","I","G"],
                    ["X","S","H","I","L","K","M","S","E","F","M","R","U","S","A","E","O","O","L","Q","T","Y","S","X","R","I","E","G","M","J"],
                    ["V","O","W","A","A","X","N","W","L","W","Y","A","T","S","D","X","W","L","S","Y","Y","A","M","I","V","E","J","W","Y","P"],
                    ["N","G","E","Y","N","N","M","E","F","V","Y","S","N","O","A","T","D","W","F","E","S","W","I","S","O","M","A","I","N","E"],
                    ["G","Q","N","H","D","E","A","M","W","K","H","K","E","U","V","K","E","R","I","N","N","A","A","N","A","I","D","N","I","B"],
                    ["I","M","A","O","X","M","D","G","O","Y","N","A","K","R","E","O","R","N","A","S","W","N","T","Q","T","H","Z","D","F","N"],
                    ["A","T","Q","I","A","O","N","P","B","Y","O","V","X","I","N","N","D","K","N","A","C","E","I","Y","A","S","A","O","P","H"],
                    ["U","M","C","B","I","V","N","E","W","J","E","R","S","E","Y","Z","R","M","H","E","X","O","J","M","O","N","H","M","C","S"],
                    ["I","O","A","A","Z","F","I","L","K","D","O","P","K","S","K","A","W","W","M","A","S","N","N","U","C","A","P","E","U","M"],
                    ["O","L","A","M","O","H","A","L","K","O","M","Y","T","N","G","O","W","S","S","X","P","S","B","S","D","L","E","C","Q","G"],
                    ["A","D","J","G","S","O","U","T","H","C","A","R","O","L","I","N","A","F","H","H","Y","Y","E","I","I","N","U","J","M","D"],
                    ["B","G","F","F","W","C","I","T","N","O","R","T","H","C","A","R","O","L","I","N","A","Q","J","E","I","N","I","H","F","S"]
                ],
                "_words": {
                    "h":{
                        "ALABAMA": { "_x": 0, "_y": 28, "_directionX": 1, "_directionY": -1},
                        "ALASKA":{"_x":18,"_y":2,"_directionX":0,"_directionY":1},
                        "ARIZONA":{"_x":0,"_y":17,"_directionX":0,"_directionY":-1},
                        "ARKANSAS":{"_x":15,"_y":26,"_directionX":1,"_directionY":-1},
                        "CALIFORNIA":{"_x":28,"_y":6,"_directionX":-1,"_directionY":1},
                        "COLORADO":{"_x":16,"_y":16,"_directionX":0,"_directionY":-1},
                        "CONNECTICUT":{"_x":20,"_y":12,"_directionX":0,"_directionY":-1},
                        "DELAWARE":{"_x":19,"_y":3,"_directionX":0,"_directionY":1},
                        "FLORIDA":{"_x":18,"_y":21,"_directionX":-1,"_directionY":-1},
                        "GEORGIA":{"_x":15,"_y":5,"_directionX":0,"_directionY":1},
                        "HAWAII":{"_x":18,"_y":25,"_directionX":1,"_directionY":-1},
                        "IDAHO":{"_x":23,"_y":28,"_directionX":1,"_directionY":-1},
                        "ILLINOIS":{"_x":18,"_y":18,"_directionX":1,"_directionY":0},
                        "INDIANA":{"_x":28,"_y":22,"_directionX":-1,"_directionY":0},
                        "IOWA":{"_x":13,"_y":9,"_directionX":0,"_directionY":1},
                        "KANSAS":{"_x":3,"_y":10,"_directionX":1,"_directionY":-1},
                        "KENTUCKY":{"_x":12,"_y":23,"_directionX":0,"_directionY":-1},
                        "LOUISIANA":{"_x":8,"_y":9,"_directionX":0,"_directionY":-1},
                        "MAINE":{"_x":25,"_y":21,"_directionX":1,"_directionY":0},
                        "MARYLAND":{"_x":6,"_y":19,"_directionX":0,"_directionY":-1},
                        "MASSACHUSETTS":{"_x":7,"_y":7,"_directionX":0,"_directionY":1},
                        "MICHIGAN":{"_x":28,"_y":19,"_directionX":-1,"_directionY":-1},
                        "MINNESOTA":{"_x":23,"_y":25,"_directionX":-1,"_directionY":-1},
                        "MISSISSIPPI":{"_x":29,"_y":16,"_directionX":0,"_directionY":-1},
                        "MISSOURI":{"_x":13,"_y":17,"_directionX":0,"_directionY":1},
                        "MONTANA":{"_x":14,"_y":12,"_directionX":0,"_directionY":-1},
                        "NEBRASKA":{"_x":11,"_y":16,"_directionX":0,"_directionY":1},
                        "NEVADA":{"_x":14,"_y":24,"_directionX":0,"_directionY":-1},
                        "NEWHAMPSHIRE":{"_x":2,"_y":22,"_directionX":0,"_directionY":-1},
                        "NEWJERSEY":{"_x":6,"_y":25,"_directionX":1,"_directionY":0},
                        "NEWMEXICO":{"_x":9,"_y":18,"_directionX":-1,"_directionY":1},
                        "NEWYORK":{"_x":6,"_y":20,"_directionX":1,"_directionY":1},
                        "NORTHCAROLINA":{"_x":8,"_y":29,"_directionX":1,"_directionY":0},
                        "NORTHDAKOTA":{"_x":9,"_y":12,"_directionX":0,"_directionY":-1},
                        "OHIO":{"_x":0,"_y":4,"_directionX":1,"_directionY":0},
                        "OKLAHOMA":{"_x":9,"_y":27,"_directionX":-1,"_directionY":0},
                        "OREGON":{"_x":10,"_y":16,"_directionX":0,"_directionY":-1},
                        "PENNSYLVANIA":{"_x":16,"_y":0,"_directionX":-1,"_directionY":0},
                        "RHODEISLAND":{"_x":4,"_y":12,"_directionX":0,"_directionY":1},
                        "SOUTHCAROLINA":{"_x":4,"_y":28,"_directionX":1,"_directionY":0},
                        "SOUTHDAKOTA":{"_x":17,"_y":16,"_directionX":0,"_directionY":-1},
                        "TENNESSEE":{"_x":15,"_y":21,"_directionX":1,"_directionY":1},
                        "TEXAS":{"_x":22,"_y":23,"_directionX":-1,"_directionY":1},
                        "UTAH":{"_x":0,"_y":25,"_directionX":1,"_directionY":-1},
                        "VERMONT":{"_x":27,"_y":15,"_directionX":0,"_directionY":-1},
                        "VIRGINIA":{"_x":1,"_y":11,"_directionX":0,"_directionY":1},
                        "WASHINGTON":{"_x":21,"_y":3,"_directionX":0,"_directionY":1},
                        "WESTVIRGINIA":{"_x":25,"_y":1,"_directionX":0,"_directionY":1},
                        "WISCONSIN":{"_x":17,"_y":21,"_directionX":1,"_directionY":1},
                        "WYOMING":{"_x":11,"_y":11,"_directionX":0,"_directionY":-1}
                    },
                },
            },
            Presidents: {
                "_map": [
                    ["A","E","J","A","M","S","J","W","I","L","L","I","A","M","H","O","W","A","R","D","T","A","F","T","F","F","Y","N","B","O"],
                    ["A","H","L","N","O","W","I","L","L","I","A","M","H","E","N","R","Y","H","A","R","R","I","S","O","N","L","F","O","M","T"],
                    ["N","S","X","D","S","M","A","D","A","Y","C","N","I","U","Q","N","H","O","J","K","S","I","X","U","F","O","R","S","K","Y"],
                    ["D","X","Y","T","J","H","G","N","I","D","R","A","H","G","N","E","R","R","A","W","W","M","H","W","E","P","A","I","X","E"],
                    ["R","R","O","L","Y","A","T","Y","R","A","H","C","A","Z","M","D","O","N","A","L","D","T","R","U","M","P","N","R","N","L"],
                    ["E","W","D","T","T","Y","E","F","D","W","I","G","H","T","D","E","I","S","E","N","H","O","W","E","R","Q","K","R","S","N"],
                    ["W","L","N","F","F","O","K","N","E","R","U","B","N","A","V","N","I","T","R","A","M","U","O","X","S","G","L","A","A","I"],
                    ["J","S","A","B","R","G","J","H","G","B","W","F","H","N","B","R","E","T","R","A","C","S","E","M","A","J","I","H","R","K"],
                    ["A","W","E","R","A","V","T","R","E","G","A","Q","X","L","Q","R","O","N","A","L","D","R","E","A","G","A","N","N","I","C"],
                    ["C","N","V","I","N","T","N","E","M","Z","R","U","T","H","E","R","F","O","R","D","B","H","A","Y","E","S","P","I","N","M"],
                    ["K","O","E","G","K","Y","A","V","B","G","P","Z","L","G","E","R","A","L","D","R","F","O","R","D","B","N","I","M","K","M"],
                    ["S","S","L","E","L","M","R","O","T","H","O","M","A","S","J","E","F","F","E","R","S","O","N","I","B","O","E","A","K","A"],
                    ["O","I","C","R","I","P","G","O","L","R","T","J","E","H","F","R","B","H","H","B","X","X","I","R","S","S","R","J","G","I"],
                    ["N","D","R","O","N","L","S","H","I","B","L","O","C","S","X","K","T","S","T","J","H","N","M","U","S","N","C","N","R","L"],
                    ["U","A","E","M","D","N","S","T","O","L","E","H","D","U","H","H","H","J","G","O","A","L","M","H","Z","H","E","E","O","L"],
                    ["X","M","V","L","R","T","E","R","N","Y","V","N","L","B","R","X","Q","O","E","H","R","O","W","T","T","O","G","B","V","I"],
                    ["J","S","O","L","O","W","S","E","A","N","E","A","E","W","I","M","C","S","O","N","R","C","I","R","C","J","E","D","E","W"],
                    ["Y","E","R","I","O","O","S","B","B","D","S","D","I","H","C","J","R","E","R","F","Y","N","L","A","A","W","O","C","R","W"],
                    ["B","M","G","F","S","O","Y","R","E","O","O","A","F","E","H","A","E","P","G","K","S","I","L","A","L","E","R","H","C","H"],
                    ["A","A","T","D","E","D","L","E","O","N","O","M","R","G","A","M","L","H","E","E","T","L","I","R","V","R","G","Y","L","I"],
                    ["R","J","L","R","V","R","U","H","R","B","R","S","A","R","R","E","Y","R","W","N","R","M","A","E","I","D","E","Y","E","J"],
                    ["A","R","O","A","E","O","H","M","N","J","E","Y","G","O","D","S","T","B","A","N","U","A","M","T","N","N","W","A","V","J"],
                    ["C","D","U","L","L","W","V","Z","O","O","R","H","S","E","M","K","N","I","S","E","M","H","J","S","C","A","B","K","E","L"],
                    ["K","T","G","L","T","W","W","Z","M","H","O","S","E","G","N","P","H","D","H","D","A","A","C","E","O","H","U","U","L","J"],
                    ["O","R","L","I","K","I","V","S","S","N","D","U","M","W","I","O","O","E","I","Y","N","R","L","H","O","O","S","N","A","B"],
                    ["B","F","L","M","J","L","P","O","E","S","O","J","A","L","X","L","J","N","N","S","K","B","I","C","L","H","H","I","N","C"],
                    ["A","E","J","D","Y","S","M","M","M","O","E","X","J","S","O","K","W","J","G","Q","F","A","N","L","I","M","H","N","D","G"],
                    ["M","H","Y","H","S","O","H","J","A","N","H","L","J","U","N","K","Y","R","T","D","L","Q","T","R","D","K","R","R","T","Z"],
                    ["A","K","P","A","S","N","S","M","J","S","T","E","Q","M","H","Z","Y","H","O","M","C","E","O","T","G","T","K","O","K","F"]
                    ,["E","T","V","N","A","N","A","H","C","U","B","S","E","M","A","J","W","I","N","L","F","J","N","V","E","M","U","N","U","E"]
                ],
                "_words": {
                    "h": {
                        "GEORGEWASHINGTON": {"_x": 18,"_y": 14,"_directionX": 0,"_directionY": 1},
                        "JOHNADAMS": {"_x": 11,"_y": 12,"_directionX": 0,"_directionY": 1},
                        "THOMASJEFFERSON": {"_x": 8,"_y": 11,"_directionX": 1,"_directionY": 0},
                        "JAMESMADISON": {"_x": 1,"_y": 20,"_directionX": 0,"_directionY": -1},
                        "JAMESMONROE": {"_x": 8,"_y": 28,"_directionX": 0,"_directionY": -1},
                        "JOHNQUINCYADAMS": {"_x": 18,"_y": 2,"_directionX": -1,"_directionY": 0},
                        "ANDREWJACKSON": {"_x": 0,"_y": 1,"_directionX": 0,"_directionY": 1},
                        "MARTINVANBUREN": {"_x": 20,"_y": 6,"_directionX": -1,"_directionY": 0},
                        "WILLIAMHENRYHARRISON": {"_x": 5,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "JOHNTYLER": {"_x": 16,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "JAMESKPOLK": {"_x": 15,"_y": 17,"_directionX": 0,"_directionY": 1},
                        "ZACHARYTAYLOR": {"_x": 13,"_y": 4,"_directionX": -1,"_directionY": 0},
                        "MILLARDFILLMORE": {"_x": 3,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "FRANKLINPIERCE": {"_x": 26,"_y": 1,"_directionX": 0,"_directionY": 1},
                        "JAMESBUCHANAN": {"_x": 15,"_y": 29,"_directionX": -1,"_directionY": 0},
                        "ABRAHAMLINCOLN": {"_x": 21,"_y": 26,"_directionX": 0,"_directionY": -1},
                        "ANDREWJOHNSON": {"_x": 25,"_y": 22,"_directionX": 0,"_directionY": -1},
                        "ULYSSESSGRANT": {"_x": 6,"_y": 20,"_directionX": 0,"_directionY": -1},
                        "RUTHERFORDBHAYES": {"_x": 10,"_y": 9,"_directionX": 1,"_directionY": 0},
                        "JAMESGARFIELD": {"_x": 12,"_y": 26,"_directionX": 0,"_directionY": -1},
                        "CHESTERAARTHUR": {"_x": 23,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "GROVERCLEVEAND": {"_x": 2,"_y": 18,"_directionX": 0,"_directionY": -1},
                        "BENJAMINHARRISON": {"_x": 27,"_y": 15,"_directionX": 0,"_directionY": -1},
                        "GROVERCLEVELAND": {"_x": 28,"_y": 12,"_directionX": 0,"_directionY": 1},
                        "WILLIAMMCKINLEY": {"_x": 29,"_y": 16,"_directionX": 0,"_directionY": -1},
                        "THEODOREROOSEVELT": {"_x": 10,"_y": 28,"_directionX": 0,"_directionY": -1},
                        "WILLIAMHOWARDTAFT": {"_x": 7,"_y": 0,"_directionX": 1,"_directionY": 0},
                        "WOODROWWILSON": {"_x": 5,"_y": 16,"_directionX": 0,"_directionY": 1},
                        "WARRENGHARDING": {"_x": 19,"_y": 3,"_directionX": -1,"_directionY": 0},
                        "CALVINCOOLIDGE": {"_x": 24,"_y": 16,"_directionX": 0,"_directionY": 1},
                        "HERBERTHOOVER": {"_x": 7,"_y": 20,"_directionX": 0,"_directionY": -1},
                        "FRANKLINDROOSEVELT": {"_x": 4,"_y": 6,"_directionX": 0,"_directionY": 1},
                        "HARRYSTRUMAN": {"_x": 20,"_y": 13,"_directionX": 0,"_directionY": 1},
                        "DWIGHTDEISENHOWER": {"_x": 8,"_y": 5,"_directionX": 1,"_directionY": 0},
                        "JOHNFKENNEDY": {"_x": 19,"_y": 13,"_directionX": 0,"_directionY": 1},
                        "LYNDONBJOHNSON": {"_x": 9,"_y": 14,"_directionX": 0,"_directionY": 1},
                        "RICHARDMNIXON": {"_x": 14,"_y": 15,"_directionX": 0,"_directionY": 1},
                        "GERALDRFORD": {"_x": 13,"_y": 10,"_directionX": 1,"_directionY": 0},
                        "JAMESCARTER": {"_x": 25,"_y": 7,"_directionX": -1,"_directionY": 0},
                        "RONALDREAGAN": {"_x": 15,"_y": 8,"_directionX": 1,"_directionY": 0},
                        "GEORGEHWBUSH": {"_x": 13,"_y": 23,"_directionX": 0,"_directionY": -1},
                        "WILLIAMJCLINTON": {"_x": 22,"_y": 15,"_directionX": 0,"_directionY": 1},
                        "GEORGEWBUSH": {"_x": 26,"_y": 15,"_directionX": 0,"_directionY": 1},
                        "BARACKOBAMA": {"_x": 0,"_y": 18,"_directionX": 0,"_directionY": 1},
                        "DONALDTRUMP": {"_x": 15,"_y": 4,"_directionX": 1,"_directionY": 0},
                        "JOSEPHRBIDENJR": {"_x": 17,"_y": 14,"_directionX": 0,"_directionY": 1}
                    },
                },
            },       
            Capitols: {
                "_map": [
                    ["S","Q","J","G","G","U","Q","Y","X","P","B","B","H","M","O","C","A","H","Y","W","F","T","C","U","F","P","N","L","C","K"],
                    ["X","K","G","J","Q","T","N","B","R","J","V","M","R","I","C","H","M","O","N","D","Z","Y","O","J","A","G","T","W","L","C"],
                    ["L","U","A","P","T","N","I","A","S","W","O","A","U","G","U","S","T","A","M","L","T","C","N","Z","J","E","K","G","O","H"],
                    ["S","J","L","N","Q","D","D","M","Y","N","I","R","I","E","J","X","U","V","W","I","F","E","C","R","N","X","N","L","W","O"],
                    ["Z","X","G","I","O","S","B","W","T","L","E","Y","R","I","H","X","G","S","C","V","M","S","O","D","V","O","U","U","L","N"],
                    ["J","C","P","V","T","P","T","G","Y","I","A","C","W","Q","R","T","N","N","Q","E","U","I","R","S","T","M","A","W","J","O"],
                    ["K","A","E","H","F","T","O","M","L","L","O","N","E","S","R","K","O","D","I","J","D","O","D","S","B","J","R","A","A","L"],
                    ["Q","R","L","H","M","M","L","E","E","L","X","S","S","A","E","S","I","D","R","K","P","B","O","I","Y","G","V","F","Y","U"],
                    ["B","H","S","B","E","L","P","E","I","L","J","T","L","I","R","I","V","O","F","S","K","B","A","K","T","S","F","W","E","L"],
                    ["I","X","G","R","A","T","Z","N","R","F","A","E","S","A","N","O","Z","H","E","L","E","N","A","H","I","M","E","B","Q","U"],
                    ["S","X","Y","I","N","N","C","P","J","O","I","S","C","A","C","G","B","L","I","N","C","O","L","N","C","Y","D","N","E","H"],
                    ["M","S","Z","O","X","S","Y","F","I","G","C","Y","D","L","C","D","E","N","V","E","R","T","Y","N","N","T","S","I","O","I"],
                    ["A","H","M","F","U","P","C","I","H","S","B","K","I","U","Y","R","E","H","J","J","N","G","Y","U","O","I","P","T","J","E"],
                    ["R","V","F","I","I","F","C","F","R","A","N","K","F","O","R","T","A","Y","V","N","O","K","J","J","S","C","R","S","L","O"],
                    ["C","P","H","O","E","N","I","X","R","G","S","W","M","G","F","S","E","M","S","H","T","A","E","D","R","E","I","U","I","W"],
                    ["K","J","U","L","B","F","S","M","Y","B","U","A","A","W","P","Q","I","I","E","O","L","X","E","E","E","K","N","A","H","Y"],
                    ["Q","Y","Y","F","E","V","M","X","T","G","B","V","D","K","U","F","L","U","L","N","L","D","S","S","F","A","G","T","A","E"],
                    ["N","H","T","P","I","L","V","L","E","O","M","L","I","T","Y","O","V","K","D","P","T","T","S","M","F","L","F","E","R","J"],
                    ["X","S","I","L","O","P","A","N","N","A","U","X","S","J","P","I","F","D","U","R","T","O","A","O","E","T","I","Q","R","B"],
                    ["U","T","C","G","S","Y","E","Y","U","U","L","U","O","A","J","W","Z","Q","B","O","C","X","H","I","J","L","E","Z","I","A"],
                    ["V","L","A","A","F","G","S","W","C","A","O","L","N","U","P","W","G","A","D","V","I","J","A","N","U","A","L","O","S","T"],
                    ["G","U","M","J","A","C","K","S","O","N","C","A","G","W","H","F","X","T","I","I","P","V","L","E","P","S","D","Q","B","O"],
                    ["M","J","O","S","G","V","R","O","M","P","I","E","R","R","E","Z","U","N","U","D","N","L","L","S","E","M","T","E","U","N"],
                    ["L","K","H","N","H","I","G","R","J","D","L","G","D","A","H","L","X","A","W","E","E","L","A","R","B","G","C","P","R","R"],
                    ["E","F","A","T","N","A","S","Z","N","I","L","B","E","K","J","W","E","L","U","N","E","W","T","C","I","T","L","G","G","O"],
                    ["N","D","L","R","F","E","B","I","U","F","Q","R","W","E","T","K","J","T","H","C","I","Q","N","A","F","L","D","X","X","U"],
                    ["X","I","K","K","E","N","N","E","Y","E","H","C","I","E","Y","Z","A","A","H","E","G","B","A","K","E","P","O","T","C","G"],
                    ["F","F","O","O","I","R","L","E","L","M","M","A","X","H","A","R","T","F","O","R","D","P","S","L","T","T","F","K","L","E"],
                    ["V","W","C","L","M","M","B","N","L","X","Y","C","H","A","R","L","E","S","T","O","N","E","L","L","I","V","H","S","A","N"],
                    ["F","R","H","R","Q","X","Q","O","E","A","I","P","M","Y","L","O","A","R","T","R","E","N","T","O","N","Q","D","B","P","Y"]
                ],"_words": {
                    "h": {
                        "MONTGOMERY": {"_x": 11,"_y": 1,"_directionX": -1,"_directionY": 1},
                        "JUNEAU": {"_x": 28,"_y": 5,"_directionX": -1,"_directionY": -1},
                        "PHOENIX": {"_x": 1,"_y": 14,"_directionX": 1,"_directionY": 0},
                        "LITTLEROCK": {"_x": 2,"_y": 3,"_directionX": 1,"_directionY": 1},
                        "SACRAMENTO": {"_x": 12,"_y": 9,"_directionX": 1,"_directionY": 1},
                        "DENVER": {"_x": 15,"_y": 11,"_directionX": 1,"_directionY": 0},
                        "HARTFORD": {"_x": 13,"_y": 27,"_directionX": 1,"_directionY": 0},
                        "DOVER": {"_x": 5,"_y": 3,"_directionX": -1,"_directionY": 1},
                        "TALLAHASSEE": {"_x": 22,"_y": 24,"_directionX": 0,"_directionY": -1},
                        "ATLANTA": {"_x": 17,"_y": 26,"_directionX": 0,"_directionY": -1},
                        "HONOLULU": {"_x": 29,"_y": 2,"_directionX": 0,"_directionY": 1},
                        "BOISE": {"_x": 21,"_y": 7,"_directionX": 0,"_directionY": -1},
                        "SPRINGFIELD": {"_x": 26,"_y": 11,"_directionX": 0,"_directionY": 1},
                        "INDIANAPOLIS": {"_x": 7,"_y": 25,"_directionX": 1,"_directionY": -1},
                        "DESMOINES": {"_x": 23,"_y": 14,"_directionX": 0,"_directionY": 1},
                        "TOPEKA": {"_x": 27,"_y": 26,"_directionX": -1,"_directionY": 0},
                        "FRANKFORT": {"_x": 7,"_y": 13,"_directionX": 1,"_directionY": 0},
                        "BATONROUGE": {"_x": 29,"_y": 18,"_directionX": 0,"_directionY": 1},
                        "AUGUSTA": {"_x": 11,"_y": 2,"_directionX": 1,"_directionY": 0},
                        "ANNAPOLIS": {"_x": 9,"_y": 18,"_directionX": -1,"_directionY": 0},
                        "BOSTON": {"_x": 21,"_y": 8,"_directionX": 1,"_directionY": -1},
                        "LANSING": {"_x": 9,"_y": 4,"_directionX": 1,"_directionY": 1},
                        "SAINTPAUL": {"_x": 8,"_y": 2,"_directionX": -1,"_directionY": 0},
                        "JACKSON": {"_x": 3,"_y": 21,"_directionX": 1,"_directionY": 0},
                        "JEFFERSONCITY": {"_x": 24,"_y": 19,"_directionX": 0,"_directionY": -1},
                        "HELENA": {"_x": 17,"_y": 9,"_directionX": 1,"_directionY": 0},
                        "LINCOLN": {"_x": 17,"_y": 10,"_directionX": 1,"_directionY": 0},
                        "CARSONCITY": {"_x": 12,"_y": 10,"_directionX": 1,"_directionY": -1},
                        "CONCORD": {"_x": 22,"_y": 0,"_directionX": 0,"_directionY": 1},
                        "TRENTON": {"_x": 18,"_y": 29,"_directionX": 1,"_directionY": 0},
                        "SANTAFE": {"_x": 6,"_y": 24,"_directionX": -1,"_directionY": 0},
                        "ALBANY": {"_x": 1,"_y": 6,"_directionX": 1,"_directionY": 1},
                        "RALEIGH": {"_x": 14,"_y": 6,"_directionX": -1,"_directionY": 1},
                        "BISMARCK": {"_x": 0,"_y": 8,"_directionX": 0,"_directionY": 1},
                        "COLUMBUS": {"_x": 10,"_y": 21,"_directionX": 0,"_directionY": -1},
                        "OKLAHOMACITY": {"_x": 2,"_y": 27,"_directionX": 0,"_directionY": -1},
                        "SALEM": {"_x": 11,"_y": 10,"_directionX": -1,"_directionY": -1},
                        "HARRISBURG": {"_x": 28,"_y": 15,"_directionX": 0,"_directionY": 1},
                        "PROVIDENCE": {"_x": 19,"_y": 17,"_directionX": 0,"_directionY": 1},
                        "COLUMBIA": {"_x": 29,"_y": 1,"_directionX": -1,"_directionY": 1},
                        "PIERRE": {"_x": 9,"_y": 22,"_directionX": 1,"_directionY": 0},
                        "NASHVILLE": {"_x": 29,"_y": 28,"_directionX": -1,"_directionY": 0},
                        "AUSTIN": {"_x": 27,"_y": 15,"_directionX": 0,"_directionY": -1},
                        "SALTLAKECITY": {"_x": 25,"_y": 21,"_directionX": 0,"_directionY": -1},
                        "MONTPELIER": {"_x": 2,"_y": 12,"_directionX": 1,"_directionY": -1},
                        "RICHMOND": {"_x": 12,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "OLYMPIA": {"_x": 15,"_y": 29,"_directionX": -1,"_directionY": 0},
                        "CHARLESTON": {"_x": 11,"_y": 28,"_directionX": 1,"_directionY": 0},
                        "MADISON": {"_x": 12,"_y": 14,"_directionX": 0,"_directionY": 1},
                        "CHEYENNE": {"_x": 11,"_y": 26,"_directionX": -1,"_directionY": 0}
                    },
                },
            },
            Norse: {
                "_map": [
                    ["G","P","C","D","Z","O","R","E","U","R","H","T","Y","E","M","V","R","K","Y","X","L","R","U","G","A","D","M","G","I","Y"],
                    ["E","G","T","J","F","W","F","I","X","W","R","N","I","L","L","S","N","O","P","V","O","X","Q","R","T","Y","O","H","U","T"],
                    ["S","Y","Q","Z","V","G","L","U","C","C","G","U","H","O","I","B","R","O","H","T","K","V","N","F","S","Y","J","V","K","L"],
                    ["S","K","Y","A","X","O","L","H","A","E","I","R","D","S","W","B","F","N","V","K","I","A","Y","R","S","T","M","A","O","E"],
                    ["N","C","N","H","L","L","O","K","S","T","W","T","F","O","I","Q","F","H","F","F","L","N","Y","E","H","U","V","E","R","X"],
                    ["O","X","G","J","R","J","X","Z","O","U","W","X","S","O","M","N","E","U","T","O","I","I","P","Y","O","F","S","T","B","V"],
                    ["T","F","Z","A","O","S","G","N","J","R","N","H","F","I","S","R","K","R","U","Z","L","R","Z","J","J","L","S","G","N","W"],
                    ["R","V","B","L","S","R","X","S","N","W","D","K","M","X","D","G","E","X","D","L","I","Y","N","A","P","O","L","N","E","X"],
                    ["A","T","O","D","J","U","D","S","K","C","J","O","V","L","T","S","M","H","E","V","V","E","K","S","E","N","K","L","S","I"],
                    ["C","F","Z","U","T","D","G","U","W","A","D","K","H","N","Y","I","B","H","C","Q","Q","R","G","I","F","O","V","H","D","K"],
                    ["A","O","D","U","R","L","U","E","R","K","H","R","K","W","R","N","M","R","C","M","G","F","Q","G","L","X","A","W","W","A"],
                    ["K","J","Q","L","U","A","V","J","L","N","F","A","E","H","E","I","M","D","A","L","L","U","R","Y","Z","J","S","H","Q","O"],
                    ["T","O","P","M","V","B","C","G","B","R","D","B","C","G","R","K","M","A","Q","B","W","A","B","N","J","U","I","W","L","A"],
                    ["X","H","N","I","A","I","N","G","A","M","F","E","E","X","P","C","T","W","N","T","K","R","U","L","R","A","R","O","W","K"],
                    ["A","R","B","D","L","B","A","V","Z","U","I","K","G","B","Y","V","N","I","A","Z","R","U","N","X","K","A","P","G","E","S"],
                    ["H","H","X","D","I","B","L","Q","R","R","C","F","T","F","E","T","J","N","S","O","C","Z","G","Q","D","Q","I","J","L","R"],
                    ["D","S","T","P","A","F","L","C","I","D","A","K","S","D","R","S","N","X","B","Q","L","H","S","J","R","H","L","G","I","R"],
                    ["E","Q","X","A","A","I","U","I","P","N","J","M","F","B","A","A","T","T","M","G","K","O","W","J","O","X","M","X","S","A"],
                    ["V","A","G","P","D","E","F","O","L","D","H","V","B","V","N","A","F","L","E","A","N","E","W","L","O","Y","I","Z","A","D"],
                    ["S","E","L","A","O","R","I","A","R","K","J","D","V","Z","D","A","F","F","A","Y","N","S","A","Q","S","F","I","N","R","I"],
                    ["R","R","W","O","T","D","O","X","G","I","G","A","R","B","J","K","J","J","T","R","O","I","P","P","T","G","N","R","D","V"],
                    ["U","B","V","R","U","F","Y","J","P","N","E","S","U","A","S","U","A","A","L","T","M","F","J","A","Y","R","M","D","G","I"],
                    ["M","T","F","N","A","O","C","J","K","L","I","R","V","T","N","L","G","F","V","Y","O","G","D","E","M","V","I","R","G","E"],
                    ["J","F","N","N","M","R","U","Q","L","N","U","L","E","D","U","Z","E","N","K","T","W","N","Z","G","S","Q","M","Y","Y","R"],
                    ["X","F","P","W","S","S","V","I","T","I","G","O","L","T","Y","Y","J","N","N","F","U","Y","N","I","G","L","I","R","R","R"],
                    ["G","A","E","K","Z","E","E","S","T","L","F","B","J","E","R","I","B","I","J","E","K","P","B","R","Y","D","R","O","C","E"],
                    ["Y","J","C","H","D","T","D","R","A","H","C","X","N","A","D","I","I","D","S","S","U","P","R","E","N","B","P","U","U","Y"],
                    ["A","X","Z","A","R","I","R","Y","J","L","B","S","A","C","P","Q","R","O","V","O","R","B","W","X","H","B","J","Q","F","H"],
                    ["D","V","N","T","V","S","Z","T","Z","M","Y","Y","M","V","Z","L","U","E","S","A","G","A","V","E","I","K","Z","X","G","O"],
                    ["S","Y","Q","G","G","I","R","F","N","V","A","X","I","O","C","Z","B","I","L","F","A","N","V","E","V","Y","E","B","P","A"]
                ],
                "_words": {
                    "h": {
                        "AEGIR": {"_x": 23,"_y": 21,"_directionX": 0,"_directionY": 1},
                        "BALDUR": {"_x": 5,"_y": 12,"_directionX": 0,"_directionY": -1},
                        "BESTLA": {"_x": 13,"_y": 14,"_directionX": 1,"_directionY": 1},
                        "BORR": {"_x": 18,"_y": 16,"_directionX": 1,"_directionY": -1},
                        "BRAGI": {"_x": 13,"_y": 20,"_directionX": -1,"_directionY": 0},
                        "BURI": {"_x": 16,"_y": 29,"_directionX": 0,"_directionY": -1},
                        "DAGUR": {"_x": 25,"_y": 0,"_directionX": -1,"_directionY": 0},
                        "DELLING": {"_x": 14,"_y": 26,"_directionX": -1,"_directionY": -1},
                        "EIR": {"_x": 11,"_y": 13,"_directionX": -1,"_directionY": 1},
                        "EOSTRE": {"_x": 24,"_y": 8,"_directionX": 1,"_directionY": -1},
                        "ELLI": {"_x": 10,"_y": 21,"_directionX": -1,"_directionY": 1},
                        "FORSETI": {"_x": 5,"_y": 21,"_directionX": 0,"_directionY": 1},
                        "FREYJA": {"_x": 23,"_y": 2,"_directionX": 0,"_directionY": 1},
                        "FREYR": {"_x": 21,"_y": 10,"_directionX": 0,"_directionY": -1},
                        "FRIGG": {"_x": 7,"_y": 29,"_directionX": -1,"_directionY": 0},
                        "FULLA": {"_x": 6,"_y": 18,"_directionX": 0,"_directionY": -1},
                        "GEFJUN": {"_x": 19,"_y": 17,"_directionX": -1,"_directionY": 1},
                        "GERD": {"_x": 13,"_y": 12,"_directionX": -1,"_directionY": -1},
                        "HEL": {"_x": 17,"_y": 9,"_directionX": 1,"_directionY": -1},
                        "HEIMDALLUR": {"_x": 13,"_y": 11,"_directionX": 1,"_directionY": 0},
                        "HERMODUR": {"_x": 17,"_y": 8,"_directionX": -1,"_directionY": -1},
                        "HLIN": {"_x": 9,"_y": 26,"_directionX": 0,"_directionY": -1},
                        "HODR": {"_x": 12,"_y": 9,"_directionX": -1,"_directionY": -1},
                        "HAEIR": {"_x": 7,"_y": 3,"_directionX": 1,"_directionY": 0},
                        "IDUNN": {"_x": 6,"_y": 19,"_directionX": -1,"_directionY": 1},
                        "JORD": {"_x": 7,"_y": 21,"_directionX": -1,"_directionY": -1},
                        "KVASIR": {"_x": 26,"_y": 8,"_directionX": 0,"_directionY": 1},
                        "LOFN": {"_x": 20,"_y": 6,"_directionX": -1,"_directionY": -1},
                        "LOKI": {"_x": 20,"_y": 0,"_directionX": 0,"_directionY": 1},
                        "MAGNI": {"_x": 9,"_y": 13,"_directionX": -1,"_directionY": 0},
                        "MANI": {"_x": 18,"_y": 17,"_directionX": 1,"_directionY": 1},
                        "MIMIR": {"_x": 26,"_y": 21,"_directionX": 0,"_directionY": 1},
                        "NANNA": {"_x": 14,"_y": 18,"_directionX": 1,"_directionY": -1},
                        "NERPUS": {"_x": 24,"_y": 26,"_directionX": -1,"_directionY": 0},
                        "NJORDUR": {"_x": 2,"_y": 4,"_directionX": 1,"_directionY": 1},
                        "NOTT": {"_x": 21,"_y": 23,"_directionX": -1,"_directionY": -1},
                        "ODINN": {"_x": 17,"_y": 27,"_directionX": 0,"_directionY": -1},
                        "ODUR": {"_x": 1,"_y": 10,"_directionX": 1,"_directionY": 0},
                        "PORR": {"_x": 26,"_y": 26,"_directionX": 1,"_directionY": -1},
                        "RAN": {"_x": 14,"_y": 16,"_directionX": 0,"_directionY": 1},
                        "SAGA": {"_x": 18,"_y": 28,"_directionX": 1,"_directionY": 0},
                        "SIF": {"_x": 21,"_y": 19,"_directionX": 0,"_directionY": 1},
                        "SIGYN": {"_x": 23,"_y": 8,"_directionX": 0,"_directionY": 1},
                        "SJOFN": {"_x": 22,"_y": 16,"_directionX": 1,"_directionY": 1},
                        "SKADI": {"_x": 12,"_y": 16,"_directionX": -1,"_directionY": 0},
                        "SKOLL": {"_x": 8,"_y": 4,"_directionX": -1,"_directionY": 0},
                        "SNOTRA": {"_x": 0,"_y": 3,"_directionX": 0,"_directionY": 1},
                        "SOL": {"_x": 13,"_y": 3,"_directionX": 0,"_directionY": -1},
                        "THOR": {"_x": 19,"_y": 2,"_directionX": -1,"_directionY": 0},
                        "THRUER": {"_x": 11,"_y": 0,"_directionX": -1,"_directionY": 0},
                        "TYR": {"_x": 7,"_y": 28,"_directionX": 0,"_directionY": -1},
                        "ULLR": {"_x": 7,"_y": 2,"_directionX": -1,"_directionY": 1},
                        "VALI": {"_x": 4,"_y": 12,"_directionX": 0,"_directionY": 1},
                        "VANIR": {"_x": 21,"_y": 2,"_directionX": 0,"_directionY": 1},
                        "VAR": {"_x": 7,"_y": 14,"_directionX": 1,"_directionY": -1},
                        "VE": {"_x": 24,"_y": 29,"_directionX": -1,"_directionY": -1},
                        "VIDARR": {"_x": 29,"_y": 20,"_directionX": 0,"_directionY": -1},
                        "VILI": {"_x": 20,"_y": 8,"_directionX": 0,"_directionY": -1},
                        "VOR": {"_x": 18,"_y": 27,"_directionX": 1,"_directionY": 0},
                        "YGGDRASIL": {"_x": 28,"_y": 23,"_directionX": 0,"_directionY": -1}
                    },
                },
            },
            Egyptian: {
                "_map": [
                    ["T","E","N","C","Q","O","N","L","W","T","N","C","S","H","O","R","U","S","S","C","C","A","B","M","T","O","O","L","E","K"],
                    ["U","L","V","G","Z","V","Y","E","L","H","Z","V","F","A","D","M","R","O","T","T","Z","I","L","A","V","E","F","R","T","Q"],
                    ["A","Y","W","J","P","T","E","T","N","E","M","I","N","N","T","S","X","K","A","H","D","R","A","Z","U","V","C","Q","C","L"],
                    ["U","D","K","U","M","H","M","N","W","B","H","E","U","H","F","E","O","A","A","F","N","E","N","E","T","A","T","S","A","A"],
                    ["R","G","U","F","U","N","H","O","T","M","I","O","D","U","V","C","T","T","N","E","M","T","Y","W","I","I","L","I","D","V"],
                    ["A","Q","L","H","N","N","E","D","R","T","O","G","P","R","Y","K","M","L","K","R","N","E","P","H","T","H","Y","S","Y","C"],
                    ["U","S","U","C","H","S","Z","P","H","Z","M","V","O","U","B","E","P","C","E","X","U","B","U","I","J","R","G","B","W","T"],
                    ["F","K","E","D","K","A","U","F","I","S","P","E","S","U","H","L","T","A","B","S","K","A","A","N","E","Q","L","B","H","E"],
                    ["S","F","M","H","T","V","D","F","T","T","W","Q","K","I","N","A","M","O","C","U","N","K","P","K","Q","T","I","E","U","Y"],
                    ["J","G","Y","D","A","H","R","N","U","O","G","A","T","H","T","V","V","T","X","X","F","B","A","Y","W","A","S","T","K","L"],
                    ["T","Z","W","J","H","A","T","E","T","S","A","B","D","E","G","M","W","A","Y","K","F","H","V","B","Y","A","J","F","G","R"],
                    ["W","E","K","R","M","Q","M","O","F","O","N","V","N","J","H","I","P","K","T","T","Y","E","P","T","T","N","S","G","U","G"],
                    ["F","B","R","E","P","U","I","S","D","V","K","K","Z","G","W","J","W","H","H","C","U","Y","Y","E","L","K","E","K","J","J"],
                    ["Z","T","X","S","H","P","T","I","S","X","A","B","Z","P","V","E","B","T","F","E","H","J","A","S","U","P","P","F","V","N"],
                    ["S","R","Y","T","O","Q","L","R","K","I","S","T","T","J","J","O","R","E","G","H","H","A","M","P","N","L","P","Z","X","E"],
                    ["U","H","S","B","I","W","U","I","E","O","L","A","N","Y","A","U","U","B","C","K","T","M","U","V","B","T","L","Y","F","K"],
                    ["J","O","K","K","M","H","K","S","W","F","T","E","J","D","A","W","R","H","M","S","Q","C","N","M","G","P","T","E","I","R"],
                    ["T","Q","A","K","B","C","N","M","Q","O","E","A","N","U","K","E","T","K","R","U","H","L","E","I","R","E","U","I","W","E"],
                    ["E","D","Q","N","Q","O","N","E","O","C","V","N","Q","D","B","U","T","E","G","C","T","T","T","L","R","I","I","U","K","N"],
                    ["Q","G","M","M","U","J","R","D","M","U","S","U","M","L","H","E","X","N","F","N","E","A","E","Q","P","A","G","H","D","E"],
                    ["E","Q","O","A","W","B","I","T","G","K","F","Q","T","C","M","T","O","H","T","W","G","V","A","F","C","Z","B","B","H","N"],
                    ["H","N","E","A","K","U","I","Y","O","E","R","O","S","H","U","A","Y","Y","A","C","Y","M","D","V","N","G","L","B","T","U"],
                    ["S","E","H","A","H","N","M","S","L","G","B","E","K","I","D","A","Q","Q","U","T","U","S","N","L","S","U","O","V","O","T"],
                    ["K","J","M","I","E","E","P","U","W","J","G","E","Z","S","P","M","M","O","B","N","H","A","G","R","U","Q","T","Q","H","E"],
                    ["C","E","J","C","P","Z","C","L","Z","G","S","Z","N","F","Q","A","W","S","J","U","T","O","T","Y","I","K","V","P","T","T"],
                    ["D","A","M","B","R","T","D","M","M","O","J","H","U","Y","H","A","H","A","N","N","E","K","R","S","O","B","E","K","E","A"],
                    ["A","D","I","Q","I","Y","I","Z","D","U","K","A","T","K","H","O","N","S","U","N","H","W","I","T","B","C","P","O","R","M"],
                    ["F","J","S","Y","O","Y","T","M","P","H","T","M","O","N","T","U","W","Y","S","E","K","M","P","T","A","H","P","J","B","F"],
                    ["C","O","I","D","U","U","E","Q","M","L","N","S","J","R","E","P","E","N","D","B","A","H","Y","T","X","R","K","G","V","W"],
                    ["U","D","S","I","B","K","S","X","M","E","S","K","F","B","W","I","F","K","T","V","P","I","W","K","B","L","C","W","W","I"]
                ],
                "_words": {
                    "h": {
                        "AKER": {"_x": 22,"_y": 9,"_directionX": 1,"_directionY": -1},
                        "AMUN": {"_x": 22,"_y": 20,"_directionX": -1,"_directionY": 1},
                        "AMUNET": {"_x": 22,"_y": 13,"_directionX": 0,"_directionY": 1},
                        "ANHUR": {"_x": 13,"_y": 1,"_directionX": 0,"_directionY": 1},
                        "ANUBIS": {"_x": 2,"_y": 17,"_directionX": 1,"_directionY": 1},
                        "ANUKET": {"_x": 11,"_y": 17,"_directionX": 1,"_directionY": 0},
                        "ATEN": {"_x": 15,"_y": 8,"_directionX": -1,"_directionY": 1},
                        "ATUM": {"_x": 21,"_y": 19,"_directionX": -1,"_directionY": -1},
                        "BASTET": {"_x": 11,"_y": 10,"_directionX": -1,"_directionY": 0},
                        "BAT": {"_x": 18,"_y": 7,"_directionX": -1,"_directionY": 0},
                        "BENNU": {"_x": 19,"_y": 28,"_directionX": 0,"_directionY": -1},
                        "GEB": {"_x": 8,"_y": 20,"_directionX": 1,"_directionY": 1},
                        "HAPI": {"_x": 16,"_y": 25,"_directionX": -1,"_directionY": -1},
                        "HATHOR": {"_x": 17,"_y": 20,"_directionX": 1,"_directionY": 1},
                        "HATMEHIT": {"_x": 19,"_y": 2,"_directionX": -1,"_directionY": 1},
                        "HEH": {"_x": 20,"_y": 14,"_directionX": -1,"_directionY": -1},
                        "HEQET": {"_x": 0,"_y": 21,"_directionX": 0,"_directionY": -1},
                        "HESAT": {"_x": 28,"_y": 7,"_directionX": -1,"_directionY": 1},
                        "HORUS": {"_x": 13,"_y": 0,"_directionX": 1,"_directionY": 0},
                        "IMENTET": {"_x": 11,"_y": 2,"_directionX": -1,"_directionY": 0},
                        "ISIS": {"_x": 2,"_y": 26,"_directionX": 0,"_directionY": 1},
                        "KEK": {"_x": 27,"_y": 12,"_directionX": -1,"_directionY": 0},
                        "KHEPRI": {"_x": 4,"_y": 21,"_directionX": 0,"_directionY": 1},
                        "KHNUM": {"_x": 4,"_y": 7,"_directionX": 0,"_directionY": -1},
                        "KHONSU": {"_x": 13,"_y": 26,"_directionX": 1,"_directionY": 0},
                        "MAAHES": {"_x": 6,"_y": 11,"_directionX": -1,"_directionY": -1},
                        "MAAT": {"_x": 15,"_y": 23,"_directionX": 0,"_directionY": -1},
                        "MENHIT": {"_x": 8,"_y": 19,"_directionX": -1,"_directionY": -1},
                        "MONTU": {"_x": 11,"_y": 27,"_directionX": 1,"_directionY": 0},
                        "MUT": {"_x": 8,"_y": 25,"_directionX": 1,"_directionY": 1},
                        "NEFERTUM": {"_x": 11,"_y": 18,"_directionX": -1,"_directionY": -1},
                        "NEITH": {"_x": 12,"_y": 2,"_directionX": -1,"_directionY": 1},
                        "NEKHBET": {"_x": 17,"_y": 19,"_directionX": 0,"_directionY": -1},
                        "NEMTY": {"_x": 18,"_y": 4,"_directionX": 1,"_directionY": 0},
                        "NEPER": {"_x": 17,"_y": 28,"_directionX": -1,"_directionY": 0},
                        "NEPHTHYS": {"_x": 20,"_y": 5,"_directionX": 1,"_directionY": 0},
                        "NEPIT": {"_x": 5,"_y": 4,"_directionX": 1,"_directionY": 1},
                        "NU": {"_x": 5,"_y": 22,"_directionX": 0,"_directionY": -1},
                        "NUT": {"_x": 12,"_y": 24,"_directionX": 0,"_directionY": 1},
                        "OSIRIS": {"_x": 7,"_y": 11,"_directionX": 0,"_directionY": 1},
                        "PAKHET": {"_x": 20,"_y": 29,"_directionX": 0,"_directionY": -1},
                        "PTAH": {"_x": 22,"_y": 27,"_directionX": 1,"_directionY": 0},
                        "RA": {"_x": 28,"_y": 26,"_directionX": 1,"_directionY": -1},
                        "RENENUTET": {"_x": 29,"_y": 16,"_directionX": 0,"_directionY": 1},
                        "SATET": {"_x": 12,"_y": 0,"_directionX": 1,"_directionY": 1},
                        "SEKHMET": {"_x": 10,"_y": 24,"_directionX": 1,"_directionY": -1},
                        "SET": {"_x": 6,"_y": 29,"_directionX": 0,"_directionY": -1},
                        "SHU": {"_x": 12,"_y": 21,"_directionX": 1,"_directionY": 0},
                        "SOBEK": {"_x": 23,"_y": 25,"_directionX": 1,"_directionY": 0},
                        "SOPDU": {"_x": 12,"_y": 7,"_directionX": 0,"_directionY": -1},
                        "TATENEN": {"_x": 26,"_y": 3,"_directionX": -1,"_directionY": 0},
                        "TEFNUT": {"_x": 21,"_y": 18,"_directionX": 1,"_directionY": 1},
                        "THOTH": {"_x": 28,"_y": 24,"_directionX": 0,"_directionY": -1},
                        "WADJET": {"_x": 15,"_y": 16,"_directionX": -1,"_directionY": 0},
                        "WADJWER": {"_x": 10,"_y": 8,"_directionX": 1,"_directionY": 1},
                        "WOSRET": {"_x": 5,"_y": 15,"_directionX": -1,"_directionY": -1}
                    }
                }
            },
            Roman: {
                "_map": [
                    ["X","D","J","L","K","G","A","V","P","R","W","P","E","O","Y","J","T","G","N","K","G","J","N","Z","O","H","L","S","E","P"],
                    ["O","I","G","B","R","D","V","U","T","W","T","M","H","Y","I","U","J","Y","K","E","I","R","Y","G","R","W","K","U","Z","O"],
                    ["J","A","V","F","E","E","R","J","R","K","N","R","J","V","C","E","R","E","S","N","U","Y","I","W","W","Z","V","B","M","T"],
                    ["V","N","L","O","H","B","K","X","U","O","N","U","X","N","P","I","B","R","I","T","Y","W","E","P","B","T","H","I","H","U"],
                    ["C","A","Z","C","A","E","L","U","S","P","R","O","S","E","R","P","I","N","A","V","L","J","Q","E","S","O","N","Y","Q","F"],
                    ["Z","R","O","M","A","L","H","J","Q","Z","N","A","Y","Y","A","Z","S","S","K","V","K","K","A","P","W","A","Y","J","Y","N"],
                    ["S","Z","A","Q","R","S","B","E","X","F","K","K","P","O","M","O","N","A","R","T","R","I","V","A","P","F","X","P","P","T"],
                    ["Y","B","P","U","R","F","O","R","T","U","N","A","K","C","Y","B","E","L","E","P","C","E","S","Y","B","J","J","D","D","J"],
                    ["L","W","X","V","E","M","F","S","U","N","U","A","F","E","A","W","F","A","A","F","Y","A","N","R","O","E","Q","P","M","S"],
                    ["X","S","W","P","T","R","A","H","Q","A","G","L","R","Y","T","U","L","M","D","C","N","R","S","I","A","Z","L","X","V","U"],
                    ["T","Z","H","Y","V","T","F","G","X","M","B","Z","J","H","R","E","I","V","X","Z","A","U","U","F","M","M","I","S","O","K"],
                    ["T","W","A","L","I","W","A","J","J","B","Q","I","L","O","A","D","O","L","F","G","R","P","J","C","E","S","H","P","C","T"],
                    ["N","C","K","R","T","N","P","V","Y","O","D","G","I","R","Z","R","S","R","J","R","K","J","O","Y","R","U","U","E","K","T"],
                    ["K","N","E","Q","O","T","F","Q","K","J","N","U","L","U","P","V","E","C","I","D","V","Z","A","L","S","E","I","S","S","D"],
                    ["W","V","T","L","X","K","I","I","N","Y","Z","S","Y","Z","E","O","A","Q","N","T","Y","R","I","N","L","D","M","C","J","B"],
                    ["T","L","L","A","H","M","I","I","W","U","Z","V","Q","H","A","M","J","H","N","F","D","M","F","Z","U","O","B","I","K","E"],
                    ["P","E","P","W","R","T","H","K","J","T","V","E","S","T","A","G","H","V","T","D","U","R","U","F","L","S","R","U","X","L"],
                    ["B","N","B","J","T","O","U","Z","E","H","H","O","V","J","W","W","S","Q","L","E","A","L","R","I","Z","J","U","N","O","D"],
                    ["Q","M","X","C","M","G","L","I","L","P","W","R","P","R","A","B","Q","F","H","H","J","U","P","V","U","M","L","W","A","B"],
                    ["K","L","W","V","P","M","H","F","Z","T","E","N","U","C","D","X","K","M","E","S","T","T","K","R","V","V","Q","C","L","C"],
                    ["J","L","S","I","W","W","Z","S","N","T","C","C","E","N","M","R","O","I","E","U","V","N","V","R","A","T","N","Y","X","O"],
                    ["N","R","A","Z","F","J","B","E","I","F","Z","F","K","P","Z","L","N","N","Z","N","G","G","A","M","Q","G","W","Q","T","D"],
                    ["T","A","F","R","U","J","T","P","F","D","I","Y","F","K","T","G","O","P","T","E","O","N","Y","C","P","Y","R","U","I","D"],
                    ["C","P","P","U","G","Y","U","L","J","C","I","L","B","P","L","U","T","O","B","V","T","Z","P","Q","L","X","U","Y","X","I"],
                    ["V","L","G","P","U","J","J","Y","V","L","I","P","P","A","C","Z","N","M","O","D","I","G","B","C","U","U","Z","U","I","S"],
                    ["P","H","S","T","X","Z","H","X","I","A","L","Y","U","S","C","M","B","E","D","P","Q","N","Z","H","B","L","V","J","Z","L"],
                    ["J","M","R","C","W","R","A","B","O","T","U","A","C","C","B","C","I","H","U","A","K","R","C","J","U","K","Y","H","R","S"],
                    ["X","X","O","M","Q","O","X","A","M","K","B","O","E","Y","A","Q","H","M","G","I","N","Q","Q","X","A","H","N","I","O","T"],
                    ["S","L","I","A","S","J","Y","K","F","U","Z","Q","K","S","V","X","V","U","I","W","N","Q","E","M","X","L","O","M","O","Y"],
                    ["O","L","H","K","M","T","F","P","M","E","Y","D","A","D","R","C","L","A","S","K","O","J","I","G","W","S","W","Q","Q","E"]
                ],
                "_words": {
                    "h": {
                        "APOLLO": {"_x": 20,"_y": 10,"_directionX": 1,"_directionY": 1},
                        "AURORA": {"_x": 6,"_y": 0,"_directionX": 1,"_directionY": 1},
                        "BACCHUS": {"_x": 12,"_y": 23,"_directionX": 1,"_directionY": 1},
                        "BELLONA": {"_x": 0,"_y": 17,"_directionX": 1,"_directionY": -1},
                        "CAELUS": {"_x": 3,"_y": 4,"_directionX": 1,"_directionY": 0},
                        "CERES": {"_x": 14,"_y": 2,"_directionX": 1,"_directionY": 0},
                        "CUPID": {"_x": 13,"_y": 26,"_directionX": -1,"_directionY": -1},
                        "CYBELE": {"_x": 13,"_y": 7,"_directionX": 1,"_directionY": 0},
                        "DIANA": {"_x": 1,"_y": 0,"_directionX": 0,"_directionY": 1},
                        "FAUNUS": {"_x": 12,"_y": 8,"_directionX": -1,"_directionY": 0},
                        "FLORA": {"_x": 7,"_y": 19,"_directionX": -1,"_directionY": -1},
                        "FORTUNA": {"_x": 5,"_y": 7,"_directionX": 1,"_directionY": 0},
                        "JANUS": {"_x": 21,"_y": 12,"_directionX": 1,"_directionY": 1},
                        "JUNO": {"_x": 25,"_y": 17,"_directionX": 1,"_directionY": 0},
                        "JUPITER": {"_x": 5,"_y": 24,"_directionX": 1,"_directionY": -1},
                        "MARS": {"_x": 25,"_y": 10,"_directionX": -1,"_directionY": -1},
                        "MERCURY": {"_x": 26,"_y": 14,"_directionX": -1,"_directionY": -1},
                        "MINERVA": {"_x": 24,"_y": 10,"_directionX": -1,"_directionY": -1},
                        "NEPTUNE": {"_x": 11,"_y": 19,"_directionX": 1,"_directionY": 1},
                        "NYX": {"_x": 26,"_y": 4,"_directionX": 0,"_directionY": 1},
                        "PLUTO": {"_x": 13,"_y": 23,"_directionX": 1,"_directionY": 0},
                        "PROSERPINA": {"_x": 9,"_y": 4,"_directionX": 1,"_directionY": 0},
                        "POMONA": {"_x": 12,"_y": 6,"_directionX": 1,"_directionY": 0},
                        "SATURN": {"_x": 17,"_y": 5,"_directionX": 1,"_directionY": -1},
                        "SPES": {"_x": 27,"_y": 10,"_directionX": 0,"_directionY": 1},
                        "TERRA": {"_x": 4,"_y": 9,"_directionX": 0,"_directionY": -1},
                        "VENUS": {"_x": 19,"_y": 23,"_directionX": 0,"_directionY": -1},
                        "VERITAS": {"_x": 1,"_y": 14,"_directionX": 1,"_directionY": -1},
                        "VESTA": {"_x": 10,"_y": 16,"_directionX": 1,"_directionY": 0},
                        "VULCAN": {"_x": 26,"_y": 25,"_directionX": -1,"_directionY": -1}
                    },
                },
            },
            Greek: {
                "_map": [
                    ["U","A","V","G","A","K","D","T","H","A","N","A","T","O","S","M","N","S","U","N","O","R","C","E","Z","N","F","B","W","H"],
                    ["N","G","T","E","T","H","Y","S","T","P","U","F","E","C","D","C","X","R","A","T","L","A","S","I","R","I","C","Z","E","N"],
                    ["Q","Y","A","Y","K","A","Q","I","S","S","B","P","E","R","S","E","S","J","L","S","O","N","P","Y","H","P","R","L","T","M"],
                    ["F","C","X","P","G","O","S","C","T","P","U","O","E","F","D","T","W","P","T","D","S","H","A","I","P","Z","I","T","D","P"],
                    ["Z","B","F","O","O","X","S","Y","H","Q","X","S","U","T","N","O","P","P","V","I","T","Y","N","D","H","O","U","M","A","D"],
                    ["S","E","D","A","H","L","X","U","O","R","S","E","O","S","I","Y","D","F","E","F","B","H","Y","C","S","K","S","Q","P","U"],
                    ["I","E","N","C","I","T","L","M","E","C","O","E","C","N","Z","D","W","H","U","S","R","F","T","V","O","J","S","V","E","F"],
                    ["U","K","V","H","H","J","Q","O","R","C","N","N","N","B","I","Y","O","U","A","P","D","Z","O","A","W","T","U","C","G","B"],
                    ["K","B","J","L","D","E","Q","F","D","P","Y","D","O","A","Q","J","A","R","U","P","B","X","S","O","O","C","N","Z","S","H"],
                    ["T","T","P","Y","G","E","P","S","A","V","I","S","I","S","H","S","G","H","H","R","A","R","E","M","E","H","A","R","R","H"],
                    ["A","F","E","S","K","P","E","H","R","N","N","T","V","O","Q","P","U","I","T","P","T","H","R","H","E","D","R","Z","O","W"],
                    ["R","Y","J","R","Q","L","A","T","A","E","M","M","A","S","N","X","D","D","G","Q","A","D","T","P","S","K","U","P","F","X"],
                    ["T","L","L","A","E","S","L","S","X","E","T","G","R","H","E","Y","L","L","P","O","S","E","I","D","O","N","N","H","R","A"],
                    ["A","N","K","N","Y","B","U","E","O","O","S","E","Z","S","N","E","S","O","I","Y","A","T","H","E","N","A","N","A","E","A"],
                    ["R","C","E","J","X","T","U","T","T","H","Y","T","M","G","J","N","S","U","I","S","G","H","T","S","I","T","E","M","N","S"],
                    ["U","O","U","R","E","A","H","S","E","O","K","U","U","E","K","Z","V","I","S","B","Y","S","D","B","W","K","K","O","K","A"],
                    ["S","F","K","B","N","Y","E","S","H","P","V","V","S","S","D","V","J","A","J","P","U","V","W","V","S","D","S","O","K","F"],
                    ["Y","A","W","H","F","D","R","R","I","C","A","W","D","U","R","X","L","A","E","N","C","J","E","A","I","O","K","O","Z","Z"],
                    ["R","F","S","W","L","R","M","S","H","S","R","I","M","X","E","A","R","R","A","T","L","S","B","S","I","Q","R","R","X","Z"],
                    ["M","Z","U","T","Z","K","E","H","U","E","E","N","Z","I","H","O","I","E","E","E","H","M","U","Z","E","R","A","E","I","I"],
                    ["Q","H","E","U","Y","S","S","R","Y","I","A","M","A","T","Y","O","C","T","L","T","M","E","W","N","Y","B","E","H","Y","A"],
                    ["Z","E","A","U","B","K","O","X","E","Z","T","L","E","I","N","O","H","A","N","O","Q","N","M","S","S","Q","E","T","F","N"],
                    ["G","S","R","Y","S","F","Y","Y","K","H","C","E","K","N","D","B","N","A","D","H","D","Y","E","I","I","R","N","O","S","D"],
                    ["G","T","T","P","A","H","A","V","B","N","T","R","O","N","H","T","S","D","C","J","I","D","A","M","S","M","Q","K","H","A"],
                    ["U","I","S","E","O","R","J","B","P","S","O","E","V","N","O","A","M","G","I","L","Z","S","O","X","O","O","E","J","A","P"],
                    ["V","A","A","S","E","Z","R","B","Z","S","J","I","A","S","E","R","L","K","A","O","X","S","X","N","J","S","O","T","Y","Z"],
                    ["A","Q","V","S","N","C","H","O","Q","G","J","W","A","G","I","M","S","G","V","X","N","A","I","E","H","T","Y","A","R","G"],
                    ["A","W","M","K","X","U","S","L","G","J","L","O","D","X","W","C","Z","H","M","X","I","E","X","U","O","I","F","N","Z","A"],
                    ["S","U","E","H","T","E","M","I","P","E","J","P","R","O","M","E","T","H","E","U","S","C","H","A","O","S","B","S","E","V"],
                    ["H","E","R","A","Y","D","Y","O","Z","P","S","B","G","A","I","A","M","W","I","J","V","J","C","R","S","A","L","L","A","P"]
                ],
                "_words": {
                    "h": {
                        "ACHLYS": {"_x": 3,"_y": 5,"_directionX": 0,"_directionY": 1},
                        "AETHER": {"_x": 12,"_y": 25,"_directionX": -1,"_directionY": -1},
                        "AION": {"_x": 12,"_y": 26,"_directionX": -1,"_directionY": -1},
                        "ANANKE": {"_x": 29,"_y": 15,"_directionX": -1,"_directionY": -1},
                        "ANYTOS": {"_x": 22,"_y": 3,"_directionX": 0,"_directionY": 1},
                        "APHRODITE": {"_x": 20,"_y": 11,"_directionX": -1,"_directionY": -1},
                        "APOLLO": {"_x": 2,"_y": 2,"_directionX": 1,"_directionY": 1},
                        "ARES": {"_x": 6,"_y": 23,"_directionX": -1,"_directionY": 1},
                        "ARTEMIS": {"_x": 29,"_y": 27,"_directionX": -1,"_directionY": -1},
                        "ASTERIA": {"_x": 29,"_y": 23,"_directionX": -1,"_directionY": -1},
                        "ASTRAEUS": {"_x": 2,"_y": 25,"_directionX": 0,"_directionY": -1},
                        "ATHENA": {"_x": 20,"_y": 13,"_directionX": 1,"_directionY": 0},
                        "ATLAS": {"_x": 18,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "CHAOS": {"_x": 21,"_y": 28,"_directionX": 1,"_directionY": 0},
                        "CHRONOS": {"_x": 7,"_y": 3,"_directionX": 1,"_directionY": 1},
                        "COEUS": {"_x": 16,"_y": 20,"_directionX": -1,"_directionY": -1},
                        "CRIUS": {"_x": 26,"_y": 1,"_directionX": 0,"_directionY": 1},
                        "CRONUS": {"_x": 22,"_y": 0,"_directionX": -1,"_directionY": 0},
                        "DEMETER": {"_x": 14,"_y": 16,"_directionX": -1,"_directionY": -1},
                        "DIONE": {"_x": 17,"_y": 23,"_directionX": 1,"_directionY": 1},
                        "DIONYSUS": {"_x": 11,"_y": 8,"_directionX": 1,"_directionY": 1},
                        "EOS": {"_x": 11,"_y": 5,"_directionX": 1,"_directionY": 0},
                        "EPIMETHEUS": {"_x": 9,"_y": 28,"_directionX": -1,"_directionY": 0},
                        "EREBUS": {"_x": 2,"_y": 10,"_directionX": 1,"_directionY": 1},
                        "EROS": {"_x": 27,"_y": 19,"_directionX": -1,"_directionY": -1},
                        "GAIA": {"_x": 12,"_y": 29,"_directionX": 1,"_directionY": 0},
                        "HADES": {"_x": 4,"_y": 5,"_directionX": -1,"_directionY": 0},
                        "HELIOS": {"_x": 29,"_y": 0,"_directionX": -1,"_directionY": 1},
                        "HEMERA": {"_x": 25,"_y": 9,"_directionX": -1,"_directionY": 0},
                        "HEPHAESTUS": {"_x": 4,"_y": 7,"_directionX": 1,"_directionY": 1},
                        "HERA": {"_x": 0,"_y": 29,"_directionX": 1,"_directionY": 0},
                        "HERMES": {"_x": 6,"_y": 15,"_directionX": 0,"_directionY": 1},
                        "HESTIA": {"_x": 1,"_y": 20,"_directionX": 0,"_directionY": 1},
                        "HYPERION": {"_x": 21,"_y": 14,"_directionX": -1,"_directionY": 1},
                        "HYPNOS": {"_x": 24,"_y": 2,"_directionX": -1,"_directionY": 0},
                        "IAPETUS": {"_x": 11,"_y": 18,"_directionX": -1,"_directionY": -1},
                        "LELANTOS": {"_x": 20,"_y": 18,"_directionX": -1,"_directionY": 1},
                        "LETO": {"_x": 6,"_y": 12,"_directionX": 1,"_directionY": 1},
                        "MENOETIUS": {"_x": 15,"_y": 26,"_directionX": -1,"_directionY": -1},
                        "METIS": {"_x": 27,"_y": 14,"_directionX": -1,"_directionY": 0},
                        "MNEMOSYNE": {"_x": 20,"_y": 20,"_directionX": 1,"_directionY": 1},
                        "NEMESIS": {"_x": 13,"_y": 22,"_directionX": -1,"_directionY": -1},
                        "NESOI": {"_x": 14,"_y": 13,"_directionX": 1,"_directionY": 0},
                        "NYX": {"_x": 0,"_y": 1,"_directionX": 1,"_directionY": 1},
                        "OCEANUS": {"_x": 15,"_y": 21,"_directionX": 1,"_directionY": -1},
                        "OUREA": {"_x": 1,"_y": 15,"_directionX": 1,"_directionY": 0},
                        "PALLAS": {"_x": 29,"_y": 29,"_directionX": -1,"_directionY": 0},
                        "PERSES": {"_x": 11,"_y": 2,"_directionX": 1,"_directionY": 0},
                        "PHANES": {"_x": 15,"_y": 10,"_directionX": -1,"_directionY": -1},
                        "PHOEBE": {"_x": 29,"_y": 24,"_directionX": -1,"_directionY": -1},
                        "PONTUS": {"_x": 16,"_y": 4,"_directionX": -1,"_directionY": 0},
                        "POSEIDON": {"_x": 18,"_y": 12,"_directionX": 1,"_directionY": 0},
                        "PROMETHEUS": {"_x": 11,"_y": 28,"_directionX": 1,"_directionY": 0},
                        "RHEA": {"_x": 7,"_y": 17,"_directionX": 1,"_directionY": 1},
                        "SELENE": {"_x": 7,"_y": 9,"_directionX": -1,"_directionY": 1},
                        "STYX": {"_x": 9,"_y": 2,"_directionX": -1,"_directionY": 1},
                        "SYCEUS": {"_x": 11,"_y": 9,"_directionX": -1,"_directionY": -1},
                        "TARTARUS": {"_x": 0,"_y": 9,"_directionX": 0,"_directionY": 1},
                        "TETHYS": {"_x": 2,"_y": 1,"_directionX": 1,"_directionY": 0},
                        "THALASSA": {"_x": 13,"_y": 20,"_directionX": 1,"_directionY": -1},
                        "THANATOS": {"_x": 7,"_y": 0,"_directionX": 1,"_directionY": 0},
                        "THEIA": {"_x": 25,"_y": 26,"_directionX": -1,"_directionY": 0},
                        "THEMIS": {"_x": 19,"_y": 18,"_directionX": 1,"_directionY": 1},
                        "URANUS": {"_x": 26,"_y": 11,"_directionX": 0,"_directionY": -1},
                        "ZEUS": {"_x": 1,"_y": 19,"_directionX": 1,"_directionY": 1}
                    },
                },
            },
            "Design Patterns": {
                "_map": [
                    ["Y","G","T","K","G","B","T","H","Z","S","T","R","A","T","E","G","Y","G","D","Y","H","B","L","Y","W","I","I","Q","L","P"],
                    ["G","S","T","T","J","I","W","Y","V","X","U","V","V","X","Z","L","C","Z","D","N","T","I","N","Y","Q","I","W","X","H","A"],
                    ["K","C","R","Y","P","F","O","N","N","E","N","M","E","L","T","F","T","Y","V","B","J","P","Z","W","N","J","U","E","D","F"],
                    ["E","R","F","G","Q","B","F","K","C","B","J","K","M","F","A","I","Z","Y","R","E","V","R","E","S","B","O","V","A","M","M"],
                    ["Y","C","N","U","M","V","P","W","C","R","A","X","K","M","S","H","R","N","E","C","L","O","G","E","E","I","P","M","C","Z"],
                    ["R","G","P","I","M","O","M","S","Y","A","R","M","K","X","P","O","M","G","O","M","D","U","A","C","S","T","N","D","X","H"],
                    ["L","D","O","C","C","F","T","N","G","J","X","Q","G","K","T","Y","V","P","E","O","E","Y","I","I","E","V","Y","F","N","N"],
                    ["F","M","S","P","G","F","H","Q","T","Z","P","U","A","C","X","N","Z","M","H","J","V","W","T","R","Z","D","A","Z","V","D"],
                    ["I","F","E","A","V","K","G","E","T","T","G","D","A","A","N","G","E","T","X","O","K","O","L","T","H","C","A","Z","N","A"],
                    ["W","O","U","R","C","Q","L","N","L","B","F","F","U","B","U","N","E","I","U","J","R","Y","G","O","T","X","B","A","M","Q"],
                    ["B","F","Q","D","J","H","H","B","U","E","T","G","W","O","T","M","Z","A","N","S","T","E","B","O","E","O","M","Y","R","R"],
                    ["G","K","C","E","P","Z","X","M","O","C","P","Z","L","O","E","O","S","T","W","I","E","J","R","C","R","M","S","T","E","W"],
                    ["C","G","Z","U","H","O","Y","K","A","Z","Z","O","X","T","J","X","W","V","L","X","A","Y","D","Q","O","A","D","M","D","B"],
                    ["F","E","J","Y","O","U","M","R","X","I","F","O","A","W","D","J","G","I","W","A","M","O","E","C","W","H","E","S","A","U"],
                    ["Q","G","Q","J","S","C","T","X","A","K","W","L","I","X","P","A","B","X","M","E","R","U","C","M","S","V","T","M","C","T"],
                    ["W","T","P","D","X","S","U","S","C","C","P","U","D","R","X","I","O","K","T","M","H","G","O","H","E","X","V","M","A","H"],
                    ["U","C","X","U","B","I","P","E","W","M","H","U","E","D","S","G","W","H","L","Z","M","W","R","W","H","W","Y","A","F","G"],
                    ["Q","U","O","A","K","C","R","U","E","Z","V","D","G","N","M","Q","O","Q","N","I","C","I","A","M","G","J","P","N","M","I"],
                    ["B","D","W","B","Q","T","O","T","F","J","L","J","O","L","V","D","F","B","E","M","N","C","T","P","A","W","R","A","K","E"],
                    ["F","U","J","H","H","O","X","K","M","I","H","P","H","E","F","Y","W","O","N","A","Z","T","O","J","Z","D","S","T","E","W"],
                    ["C","V","C","W","R","C","Y","L","U","V","S","Z","T","B","I","T","E","R","A","T","O","R","R","T","T","N","I","V","Y","Y"],
                    ["F","I","G","J","O","J","B","B","G","E","D","I","S","P","E","P","Y","T","O","T","O","R","P","O","K","D","N","I","W","L"],
                    ["U","W","G","K","A","O","Q","W","R","Z","S","E","O","U","V","X","U","G","O","U","T","D","Z","C","H","X","G","O","D","F"],
                    ["N","G","L","A","D","P","I","F","A","O","R","G","E","T","F","M","P","M","M","I","P","H","F","Z","A","W","L","P","P","M"],
                    ["L","F","H","M","S","P","O","O","P","C","S","D","U","S","Z","J","E","P","I","R","B","C","B","T","Z","Y","E","K","S","Z"],
                    ["W","Z","C","T","Q","N","Y","M","S","I","A","I","X","J","I","U","E","V","R","E","T","E","R","P","R","E","T","N","I","V"],
                    ["W","Y","A","Q","I","P","O","E","Z","T","K","R","X","V","A","J","A","L","Y","X","J","T","T","E","I","G","O","K","R","Q"],
                    ["O","T","O","A","T","C","T","O","W","Z","L","B","Q","H","N","S","H","E","V","K","P","I","S","R","H","G","N","K","Q","J"],
                    ["E","M","H","S","V","O","Q","E","M","E","D","I","A","T","O","R","S","Q","H","J","Z","G","N","Q","Y","B","Z","C","L","E"],
                    ["E","C","V","J","E","B","K","H","O","T","Y","D","Q","U","S","O","W","Y","R","N","J","F","K","S","E","I","Z","X","A","L"]
                ],
                "_words": {
                    "h": {
                        "ABSTRACTFACTORY": {"_x": 3,"_y": 17,"_directionX": 1,"_directionY": -1},
                        "ADAPTER": {"_x": 29,"_y": 1,"_directionX": -1,"_directionY": 1},
                        "BRIDGE": {"_x": 11,"_y": 27,"_directionX": 0,"_directionY": -1},
                        "BUILDER": {"_x": 7,"_y": 21,"_directionX": 1,"_directionY": -1},
                        "CHAINOFRESPONSIBILITY": {"_x": 1,"_y": 29,"_directionX": 1,"_directionY": -1},
                        "COMMAND": {"_x": 23,"_y": 13,"_directionX": 1,"_directionY": -1},
                        "COMPOSITE": {"_x": 5,"_y": 27,"_directionX": 1,"_directionY": -1},
                        "DECORATOR": {"_x": 22,"_y": 12,"_directionX": 0,"_directionY": 1},
                        "FACADE": {"_x": 28,"_y": 16,"_directionX": 0,"_directionY": -1},
                        "FACTORYMETHOD": {"_x": 27,"_y": 6,"_directionX": -1,"_directionY": 1},
                        "FLYWEIGHT": {"_x": 29,"_y": 22,"_directionX": 0,"_directionY": -1},
                        "INTERPRETER": {"_x": 28,"_y": 25,"_directionX": -1,"_directionY": 0},
                        "ITERATOR": {"_x": 14,"_y": 20,"_directionX": 1,"_directionY": 0},
                        "MEDIATOR": {"_x": 8,"_y": 28,"_directionX": 1,"_directionY": 0},
                        "MEMENTO": {"_x": 19,"_y": 5,"_directionX": -1,"_directionY": 1},
                        "OBSERVER": {"_x": 25,"_y": 3,"_directionX": -1,"_directionY": 0},
                        "PROTOTYPE": {"_x": 22,"_y": 21,"_directionX": -1,"_directionY": 0},
                        "PROXY": {"_x": 6,"_y": 16,"_directionX": 0,"_directionY": 1},
                        "SINGLETON": {"_x": 26,"_y": 19,"_directionX": 0,"_directionY": 1},
                        "STATE": {"_x": 4,"_y": 24,"_directionX": -1,"_directionY": 1},
                        "STRATEGY": {"_x": 9,"_y": 0,"_directionX": 1,"_directionY": 0},
                        "TEMPLATEMETHOD": {"_x": 7,"_y": 18,"_directionX": 1,"_directionY": -1},
                        "VISITOR": {"_x": 26,"_y": 3,"_directionX": -1,"_directionY": 1}
                    },
                },
            },
        },
        GeneratePuzzle: function (wordset) {
            if (!wordset) {
                wordset = {};
                for (s in Game.WordSets) {
                    wordset[s] = Game.GeneratePuzzle(s);
                }
                return wordset;
            } else if (Array.isArray(wordset)) {
                return com.roller.WordSearch.generateBoardFor(wordset, 25, 25)
            } else {
                return Game.GeneratePuzzle(Game.WordSets[wordset]);
            }
        },
        Save: function () {
            var data = btoa(JSON.stringify(Game.Boards));
            Game.State.save("boards", data, "");
        },
        Load: function () {
            window.addEventListener('resize', Game.Resize);
            Game.State.load("boards", "Games.Wordsearch.LoadI");
        },
        LoadI: function (result) {
            if (!!(result.Data)) {
                try {
                    Game.Boards = JSON.parse(atob(result.Data));
                } catch (ex) {
                    ex.toString(); // TODO - Remove
                }
                Game.DisplaySavedGames();
            }
        },
        ReturnToOptions: function () {
            Game.CurrentBoard = null;
            Game.Duration = null;
            Game.StartTime = null;
            Game.GameDiv.style.opacity = 0;
            Game.SuccessDiv.style.opacity = 0;
            Game.FailedDiv.style.zIndex = -1;
            Game.FailedDiv.style.opacity = 0;
            Game.SuccessDiv.style.zIndex = -1;                    
            Game.DisplaySavedGames();
            var selector = Game.ControlsDiv.getBoundingClientRect();
            Game.ControlsDiv.style.opacity = 0;
            Game.ControlsDiv.style.transform = "translate3d(-" + selector.width + "px,-" + selector.height + "px,0px)"
            Game.OptionsDiv.style.opacity = 1;
            Game.OptionsDiv.style.transform = "translate3d(0px,0px,0px)"
        },
        DisplaySavedGames: function () {
            Game.SavedGamesTable.innerHTML = "";
            for (var i in Game.Boards) {
                var board = Game.Boards[i];
                var tr = document.createElement("tr");
                Game.SavedGamesTable.appendChild(tr);
                var td = document.createElement("td");
                tr.appendChild(td);
                var button = document.createElement("input");
                td.appendChild(button);
                button.type = "button";
                button.value = i;
                (function (i) {
                    button.onclick = function () {
                        Game.Start(null,Game.Boards[i]);
                    };
                })(i);
            }
        },
        Failed: function () {
            Game.FailedDiv.style.opacity = 1;
            Game.FailedDiv.style.zIndex = 2;
        },
        Success: function () {
            Game.StatIncrement("Success", 1);
            //Game.StatIncrement("Success - " + Game.CurrentBoard.SelectedPuzzle, 1);
            Game.StatIncrement("Success Time", Game.CurrentBoard.Duration);
            Game.StatIncrement("Success Time - " + Game.CurrentBoard.SelectedPuzzle, Game.CurrentBoard.Duration);
            Game.SuccessDiv.style.opacity = 1;
            Game.SuccessDiv.style.zIndex = 2;
            for (var key in Game.Boards) {
                var value = Game.Boards[key];
                if (value === Game.CurrentBoard) {
                    delete Game.Boards[key];
                    break;
                }
            }
        },
        Update: function (needed, wrong, duplicates, duplicateRows, duplicateColumns, emptyRows, emptyColumns, inUseRows, inUseColumns) {
    
        },                
        CheckFinished: function () {
            var board = Game.CurrentBoard;
            var selection = board._selection;
            var map = board._map;
            var words = board._words.h;
            var needed = 0;
            var complete = { };
            var completeCount = 0;
            var inProgress = { };
            var wrong = 0;

            function checkWord(word, info, i, j) {
                for (var c = 0; c < word.length; c++) {
                    if (
                            i == (c * info._directionX + info._x)
                        &&
                            j == (c * info._directionY + info._y)
                    ) {
                        return true;
                    }
                }
                return false;
            }

            function checkWords(i, j) {
                for (var word in words) {
                    if (checkWord(word, words[word], i, j)) {
                        return word;
                    }
                }
                return null;
            }

            for (var word in words) {
                needed++;
            }

            for (var j = 0; j < map.length; j++) {
                var row = map[j];
                for (var i = 0; i < row.length; i++) {
                    if (selection[j][i] == "X") {
                        var word = checkWords(i, j);
                        if (word != null) {
                            var progress = inProgress[word];
                            if (!progress) {
                                progress = 0;
                            }
                            progress++;
                            inProgress[word] = progress;
                        } else {
                            wrong++;
                        }
                    }
                }
            }

            for (var word in inProgress) {
                if (inProgress[word] >= word.length) {
                    complete[word] = true;
                }
            }

            var completeCount = 0;
            for (var j = 0; j < Game.WordsField.height(); j++) {
                for (var i = 0; i < Game.WordsField.width(); i++) {
                    var l = Game.WordsField.get(i, j);
                    if (!!(l.value())) {
                        if (!!complete[l.value()]) {
                            l.attribute("selected", completeCount);
                            completeCount++;
                        }
                    }
                    l.doneWith();
                }
            }

            Game.WordsView.update();
    
            if (completeCount >= needed && wrong <= 0) {
                Game.Success();
            } else {
                //Game.Update(needed, wrong, duplicates, duplicateRows, duplicateColumns, emptyRows, emptyColumns, inUseRows, inUseColumns);
            }
        },                
        SelectBox: function (l) {
            if (!l) {
                return;
            } else {
                var i = l.getX();
                var j = l.getY();
                var selection = Game. CurrentBoard._selection[j][i];
                if (selection == "") {
                    selection = "X";
                    Game.StatIncrement("Select Value", 1);
                } else {
                    selection = "";
                    Game.StatIncrement("Remove Value", 1);
                }
                Game.CurrentBoard._selection[j][i] = selection;
                l.attribute("selected", selection);
                Game.BoardField.refresh(function () {
                    Game.BoardView.update();
                });                
                Game.CheckFinished();
            }
        },
        UpdateTimer: function () {
            if (Game.StartTime != null) {
                var CurrentTime = new Date();
                var duration = CurrentTime - Game.StartTime + (Game.StartDuration != null ? Game.StartDuration : 0);
                Game.CurrentBoard.Duration = duration;
                var durationShow = Math.floor(duration / 1000);
                var minutes = Math.floor(durationShow / 60);
                var seconds = durationShow % 60;
                Game.TimerDiv.innerText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                Game.Save();
            }
        },
        StatIncrementI: function (result) {
            var limit = 1000000000000;
            var name = Game.StatIncrementCalls.shift();
            var amount = Game.StatIncrementCalls.shift();
            value = result.Data;
            if (value >= limit) {
                value = limit;
            } else {
                value += amount;
                if (value >= limit) {
                    value = limit;
                }
            }
            Game.State.save(name, value, "");
    
            switch (name) {
                case "Select Value":
                    break;
                case "Started":
                    Game.State.incrementAchievement("Started a Puzzle", 1, "");
                    break;
                case "Success":
                    Game.State.incrementAchievement("Completed a Puzzle", 1, "");
                    Game.State.incrementAchievement("Completed 10 Puzzles", 1, "");
                    Game.State.incrementAchievement("Completed 25 Puzzles", 1, "");
                    break;
                case "Success - Easy":
                    Game.State.incrementAchievement("Completed an Easy Puzzle", 1, "");
                    break;
                case "Success - Medium":
                    Game.State.incrementAchievement("Completed a Medium Puzzle", 1, "");
                    break;
                case "Success - Hard":
                    Game.State.incrementAchievement("Completed a Hard Puzzle", 1, "");
                    break;
                case "Success - Very Hard":
                    Game.State.incrementAchievement("Completed a Very Hard Puzzle", 1, "");
                    break;                                                                                    
            }
        },
        StatIncrement: function (name, amount) {
            Game.StatIncrementCalls.push(name);
            Game.StatIncrementCalls.push(amount);
            Game.State.load(name, "Games.Wordsearch.StatIncrementI");
        },
        Init: function () {
            Game.State = com.field.util.StateAbstract.getState();
            Game.State.signin();
            Game.ControlsDiv = document.getElementById("Controls");
            Game.SavedGamesDiv = document.getElementById("SavedGames");
            Game.SavedGamesTable = document.getElementById("SavedGamesTable");
            Game.TimerDiv = document.getElementById("Timer");
            Game.OptionsDiv = document.getElementById("Options");
            Game.BoardDiv = document.getElementById("Board");
            Game.GameDiv = document.getElementById("Game");
            Game.FailedDiv = document.getElementById("Failed");
            Game.SuccessDiv = document.getElementById("Success");
            Game.WordsDiv = document.getElementById("Words");
            Game.BoardField = com.field.Convert.array2DToFieldNoIndexes(
                com.field.Convert.array2DToFieldNoIndexesOptions()
                .value([])
            );
            Game.WordsField = com.field.Convert.array2DToFieldNoIndexes(
                com.field.Convert.array2DToFieldNoIndexesOptions()
                .value([])
            );
            Game.BoardView = com.field.views.FieldView.create(
                com.field.views.FieldView.options()
                .field(Game.BoardField)
                .tileWidth(25)
                .tileHeight(25)
                .tileBuffer(0)
                .parent(Game.BoardDiv)
                .show(true)
            );
            Game.WordsView = com.field.views.FieldView.create(
                com.field.views.FieldView.options()
                .field(Game.WordsField)
                .tileWidth(3)
                .tileHeight(20)
                .tileBuffer(0)
                .tilesAreSquares(false)
                .parent(Game.WordsDiv)
                .show(true)
            );
            var tTable = document.getElementsByTagName("table")[1].children[0];
            var endRow = tTable.children[1];
            var puzzles = [];
            for (puzzle in Game.Puzzles) {
                puzzles.push(puzzle);
            }
            puzzles.sort();
            for (puzzle in puzzles) {
                puzzle = puzzles[puzzle];
                var b = document.createElement("input");
                b.type = "button";
                b.value = puzzle;
                b.onclick = function () { Game.Start(this.value); };
                var td = document.createElement("td");
                td.appendChild(b);
                var tr = document.createElement("tr");
                tr.appendChild(td);
                tTable.insertBefore(tr, endRow);
            }
            com.field.Events.locationSelect().addEventListener(function (e) {
                var field = e.field();
                if (field.equals(Game.BoardField)) {
                    Game.SelectBox(e.location());
                } 
            });
    
            for (const name in Game.Plugins) {
                try {
                    var plugin = Game.Plugins[name];
                    plugin.Init();
                } catch (ex) {
                    ex.toString();
                }
            }
    
            setInterval(Game.UpdateTimer, 100);
            Game.Load();
            Game.State.load("theme", "Games.Wordsearch.InitI");
        },
        InitI: function (result) {
            var theme;
            try {
                theme = result.Data;
            }
            catch (ex) {}
            
            if (!theme) {
                theme = Game.Themes[0];
            }
            try {
                document.body.classList.add(theme);
            } catch (ex) {
                document.body.classList.add(Game.Themes[0]);
            }
            
            Game.StatIncrement("Init", 1);
        },
        Start: function (sPuzzle, CurrentBoard) {
            Game.StatIncrement("Started", 1);
            if (sPuzzle)
            {
                var oPuzzle = Game.Puzzles[sPuzzle];
                Game.StatIncrement("New Game", 1);
                CurrentBoard = { };
                CurrentBoard._map = oPuzzle._map;
                CurrentBoard._selection = new Array();
                CurrentBoard._words = oPuzzle._words;
                for (var row in oPuzzle._map) {
                    var newRow = new Array(oPuzzle._map[row].length);
                    newRow = newRow.fill("");
                    CurrentBoard._selection.push(newRow);
                }
                CurrentBoard.SelectedPuzzle = sPuzzle;
                CurrentBoard.WordsToSelect = 0;
                for (var word in oPuzzle._words._h) {
                    CurrentBoard.WordsToSelect++;
                }
                Game.CurrentBoard = CurrentBoard;
                
                Game.StartTime = new Date();
                CurrentBoard.StartTime = Game.StartTime;
                function pad(s) {
                    s = "" + s;
                    switch (s.length) {
                        case 0:
                            return "00";
                        case 1:
                            return "0" + s;
                        default:
                            return s;
                    }
                }                        
                Game.Boards[
                    CurrentBoard.SelectPuzzle + "-" + 
                    CurrentBoard.StartTime.getFullYear() + "-" + 
                    pad(CurrentBoard.StartTime.getMonth() + 1) + "-"  +
                    pad(CurrentBoard.StartTime.getDate()) + "-" +
                    pad(CurrentBoard.StartTime.getHours()) + "-" +
                    pad(CurrentBoard.StartTime.getMinutes()) + "-" + 
                    pad(CurrentBoard.StartTime.getSeconds())
                ] = CurrentBoard;
            } else if (!!CurrentBoard) {
                Game.StatIncrement("Load Game", 1);
                Game.StartTime = new Date();
                Game.CurrentBoard = CurrentBoard;
                Game.StartDuration = CurrentBoard.Duration;
            }
    
            Game.BoardField = com.field.Convert.array2DToFieldNoIndexes(
                com.field.Convert.array2DToFieldNoIndexesOptions()
                .value(CurrentBoard._map)
            );
            {
                var field = Game.BoardField;
                var j = 0;
                while (j < field.height()) {
                    var i = 0;
                    while (i < field.width()) {
                        var l = field.get(i, j);
                        l.attribute("selected", CurrentBoard._selection[j][i]);
                        l.doneWith();
                        i++;
                    }
    
                    j++;
                } 
            }

            var wordCollection = new Array();
            for (var word in CurrentBoard._words.h) {
                if (wordCollection.length <= 0 || wordCollection[wordCollection.length - 1].length >= 3) {
                    wordCollection.push(new Array());
                }
                wordCollection[wordCollection.length - 1].push(word);
            }

            Game.WordsField = com.field.Convert.array2DToFieldNoIndexes(
                com.field.Convert.array2DToFieldNoIndexesOptions()
                .value(wordCollection)
            );
    
            Game.BoardView.field(Game.BoardField);
            Game.WordsView.field(Game.WordsField);
            Game.GameDiv.style.opacity = 1;
            var options = Game.OptionsDiv.getBoundingClientRect();
            Game.OptionsDiv.style.opacity = 0;
            Game.OptionsDiv.style.transform = "translate3d(-" + options.width + "px,-" + options.height + "px,0px)"
        },
        SwitchTheme: function (e) {
            Game.StatIncrement("Switch Theme", 1);
            var themes = Game.Themes;
            var currentTheme = -1;
            var nextTheme;
            var i = 0;
            while (i < themes.length) {
                if (e.className.indexOf(themes[i]) >= 0) {
                    currentTheme = i;
                    break;
                } else {
                    i++;
                }
            }
            if (currentTheme == -1) {
                currentTheme = 0;
            }
            nextTheme = (currentTheme + 1) % themes.length;
            e.classList.add(themes[nextTheme]);
            e.classList.remove(themes[currentTheme]);
            Game.State.save("theme", themes[nextTheme], "");
        },
        Resize: function (e) {
            Game.BoardDiv.innerHTML = "";
            Game.BoardView = com.field.views.FieldView.create(
                com.field.views.FieldView.options()
                .field(Game.BoardField)
                .tileWidth(25)
                .tileHeight(25)
                .tileBuffer(0)
                .parent(Game.BoardDiv)
                .show(true)
            );
            Game.WordsView = com.field.views.FieldView.create(
                com.field.views.FieldView.options()
                .field(Game.WordsField)
                .tileWidth(3)
                .tileHeight(5)
                .tileBuffer(0)
                .tilesAreSquares(false)
                .parent(Game.WordsDiv)
                .show(true)
            );
        },
        Themes: [ "dark_theme", "light_theme" ],
        Plugins: { },
    };
    if (!(globalThis.Games)) {
        globalThis.Games = { };
    } 
    globalThis.Games["Wordsearch"] = Game;
})();
