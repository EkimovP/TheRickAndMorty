"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Variables
var apiUrl = 'https://rickandmortyapi.com/api/character/';
var cardsContainer = document.getElementById('cardsContainer');
var paginationContainer = document.getElementById('pagination');
var characters = [];
// Functions
function fetchCharacters() {
    return __awaiter(this, arguments, void 0, function (page) {
        var response, data, error_1;
        if (page === void 0) { page = 1; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "?page=").concat(page))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    characters = data.results;
                    displayCharacters();
                    setupPagination(data.info.pages, page);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching characters:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayCharacters() {
    if (!cardsContainer)
        return;
    cardsContainer.innerHTML = '';
    characters.forEach(function (character) {
        var card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = "\n            <img src=\"".concat(character.image, "\" alt=\"").concat(character.name, "\">\n            <h2>").concat(character.name, "</h2>\n            <p>Status: ").concat(character.status, "</p>\n            <p>Species: ").concat(character.species, "</p>\n            <p>Gender: ").concat(character.gender, "</p>\n            <a href=\"#\" onclick=\"showDetails(").concat(character.id, ")\">View details</a>\n        ");
        cardsContainer.appendChild(card);
    });
}
function setupPagination(totalPages, currentPage) {
    if (!paginationContainer)
        return;
    paginationContainer.innerHTML = '';
    var _loop_1 = function (i) {
        var button = document.createElement('button');
        button.innerText = "".concat(i);
        button.addEventListener('click', function () {
            fetchCharacters(i);
        });
        if (i === currentPage) {
            button.disabled = true;
        }
        paginationContainer.appendChild(button);
    };
    for (var i = 1; i <= totalPages; i++) {
        _loop_1(i);
    }
}
function searchCharacters() {
    return __awaiter(this, void 0, void 0, function () {
        var searchInput, searchQuery, apiUrlWithParams, statusFilter, speciesFilter, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchInput = document.getElementById('searchInput');
                    searchQuery = searchInput.value.trim();
                    apiUrlWithParams = "".concat(apiUrl, "?");
                    if (searchQuery !== '') {
                        apiUrlWithParams += "name=".concat(searchQuery, "&");
                    }
                    statusFilter = document.getElementById('statusFilter').value;
                    if (statusFilter) {
                        apiUrlWithParams += "status=".concat(statusFilter, "&");
                    }
                    speciesFilter = document.getElementById('speciesFilter').value;
                    if (speciesFilter) {
                        apiUrlWithParams += "species=".concat(speciesFilter, "&");
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(apiUrlWithParams)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    characters = data.results;
                    displayCharacters();
                    // Clear pagination when searching
                    if (paginationContainer) {
                        paginationContainer.innerHTML = '';
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error searching characters:', error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function showDetails(characterId) {
    return __awaiter(this, void 0, void 0, function () {
        var character;
        return __generator(this, function (_a) {
            character = characters.find(function (char) { return char.id === characterId; });
            if (!character)
                return [2 /*return*/];
            // Redirect to character.html with character details
            window.location.href = "character.html?id=".concat(character.id, "&name=").concat(encodeURIComponent(character.name));
            return [2 /*return*/];
        });
    });
}
// Initial fetch
fetchCharacters();
