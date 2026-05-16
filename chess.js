let selectedPiece = null;
let selectedSquare = null;

function pice_movements(variable_squeres, event) {
    const squere = document.getElementById(variable_squeres);
    const imgInside = squere.querySelector("img");
    
    if (imgInside) {
        const imgId = imgInside.id;

        if (imgId === "black_rock_right_h8") {
            rock_movment(variable_squeres, event);
        }
        else if (imgId === "black_night_right_g8") {
            night_movment(variable_squeres, event);
        }
        else if (imgId === "black_bishop_right_f8") {
            bishop_movment(variable_squeres, event);
        }
        else if (imgId === "black_king_e8") {
            king_movment(variable_squeres, event);
        }
        else if (imgId === "black_queen_left_d8") {
            queen_movment(variable_squeres, event);
        }
        else if (imgId === "black_bishop_left_c8") {
            bishop_movment(variable_squeres, event);
        }
        else if (imgId === "black_night_left_b8") {
            night_movment(variable_squeres, event);
        }
        else if (imgId === "black_rock_left_a8") {
            rock_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_a7") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_b7") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_c7") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_d7") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_e7") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_f7") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_g7") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_h7") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_a2") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_b2") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_c2") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_d2") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_e2") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_f2") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_g2") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "pwn_h2") {
            pwn_movment(variable_squeres, event);
        }
        else if (imgId === "rock_left_a8") {
            rock_movment(variable_squeres, event);
        }
        else if (imgId === "night_left_b8") {
            night_movment(variable_squeres, event);
        }
        else if (imgId === "bishop_left_c8") {
            bishop_movment(variable_squeres, event);
        }
        else if (imgId === "queen_left_d8") {
            queen_movment(variable_squeres, event);
        }
        else if (imgId === "king_e8") {
            king_movment(variable_squeres, event);
        }
        else if (imgId === "bishop_right_f8") {
            bishop_movment(variable_squeres, event);
        }
        else if (imgId === "night_right_g8") {
            night_movment(variable_squeres, event);
        }
        else if (imgId === "rock_right_h8") {
            rock_movment(variable_squeres, event);
        }
    } else {
        alert("This is an empty square");
    }
}
function pwn_movment(variable_squeres, event) {
    console.log("This is a pawn");
}
function rock_movment(variable_squeres, event) {
    console.log("This is a rock");
}
function night_movment(variable_squeres, event) {
    console.log("This is a night");
}
function bishop_movment(variable_squeres, event) {
    console.log("This is a bishop");
}
function king_movment(variable_squeres, event) {
    console.log("This is a king");
}
function queen_movment(variable_squeres, event) {
    console.log("This is a queen");
}