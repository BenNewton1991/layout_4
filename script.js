let pvp_board = document.getElementById('pvp_board');

var pvp_board_array = create_board_array();
populate_game_board(pvp_board_array, pvp_board);

let player_1_div = document.getElementById('p1_score');
let player_2_div = document.getElementById('p2_score');

let player_turn = 'x';
let player_1_score = 0;
let player_2_score = 0; 

function check_draw()
{
    let placed_count = 0;

    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if (pvp_board_array[i][j].getAttribute('owner') != '')
            {
                placed_count ++;
            } 
        }
    }

    if (placed_count >= 9)
    {
        alert('DRAW!');
        pvp_board_array = create_board_array();
        populate_game_board(pvp_board_array, pvp_board);
    }
}

function check_winner(board_array, player_1_div, player_2_div)
{
    let won = false;
    let winner; 
    let owner = board_array[0][0].getAttribute('owner');
    if (owner == board_array[0][1].getAttribute('owner') &&
        owner == board_array[0][2].getAttribute('owner') && 
        owner!= '')
    {
        winner = owner;
        won = true;
    } 
    owner = board_array[1][0].getAttribute('owner');
    if (owner == board_array[1][1].getAttribute('owner') &&
        owner == board_array[1][2].getAttribute('owner') && 
        owner!= '')
    {
        winner = owner;
        won = true;
    } 

    owner = board_array[2][0].getAttribute('owner');
    if (owner == board_array[2][1].getAttribute('owner') &&
        owner == board_array[2][2].getAttribute('owner') && 
        owner!= '')
    {
        winner = owner;
        won = true;
    } 

    owner = board_array[0][0].getAttribute('owner');
    if (owner == board_array[1][0].getAttribute('owner') &&
        owner == board_array[2][0].getAttribute('owner') && 
        owner!= '')
    {
        winner = owner;
        won = true;
    } 

    owner = board_array[0][1].getAttribute('owner');
    if (owner == board_array[1][1].getAttribute('owner') &&
        owner == board_array[2][1].getAttribute('owner') && 
        owner!= '')
    {
        winner = owner;
        won = true;
    } 

    owner = board_array[0][2].getAttribute('owner');
    if (owner == board_array[1][2].getAttribute('owner') &&
        owner == board_array[2][2].getAttribute('owner') && 
        owner!= '')
    {
        winner = owner;
        won = true;
    } 

    owner = board_array[0][0].getAttribute('owner');
    if (owner == board_array[1][1].getAttribute('owner') &&
        owner == board_array[2][2].getAttribute('owner') && 
        owner!= '')
    {
        winner = owner;
        won = true;
    } 

    owner = board_array[0][2].getAttribute('owner');
    if (owner == board_array[1][1].getAttribute('owner') &&
        owner == board_array[2][0].getAttribute('owner') && 
        owner!= '')
    {
        winner = owner;
        won = true;
    }

    if (won)
    {
        if (winner == 'x')
        {   player_1_score ++;
            player_1_div.innerHTML =" Player X: " + player_1_score;
        }
        else 
        {
            player_2_score ++;
            player_2_div.innerHTML =" Player O: " + player_2_score;
        }
        alert('Winner : ' + winner);
        pvp_board_array = create_board_array();
        populate_game_board(pvp_board_array, pvp_board);

    }

}

function board_slot(id)
{
    let slot = document.createElement('div');
    slot.setAttribute('id', id);
    slot.setAttribute('class', 'play_box');
    slot.setAttribute('owner', '');
    slot.addEventListener('click', function(){
        set_state(slot, player_turn);
        check_winner(pvp_board_array, player_1_div, player_2_div);
        check_draw();
    });

    return slot; 
}

function create_board_array()
{
    let id = 0; 
    let board = [];

    for(let i = 0; i < 3; i++)
    {
        board[i] = [];
        for(let j = 0; j < 3; j++)
        {
            board[i][j] = board_slot(id);
            id ++;
        }
    }

    return board;
}

function populate_game_board(div_array, game_board)
{   
    game_board.innerHTML = '';
    let length = div_array.length;
    for (let i = 0; i < length; i++)
    {
        for (let j = 0; j < length; j++)
        {
            game_board.appendChild(div_array[i][j]);
        }
    }
}


function set_state(element)
{
    if (element.getAttribute('owner') == '')
    {
        element.setAttribute('owner', player_turn);
        element.innerHTML = player_turn;
        if (player_turn == 'x')
        {
            player_turn = 'o';
        }
        else 
        {
            player_turn = 'x';
        }
    }
    
}