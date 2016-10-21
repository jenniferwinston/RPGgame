$(document).ready(function() {

    $('#hero, #opponent, #attack').hide();

    var players = [{
        name: 'UCF',
        ap  : 70,
        cap : 50,
        hp  : 100,
        exp : 1,
        img : 'assets/images/ucf.png'
    }, {
        name: 'USF',
        ap  : 80,
        cap : 50,
        hp  : 150,
        exp : 1,
        img : 'assets/images/usf.png'
    }, {
        name: 'UF',
        ap  : 90,
        cap : 50,
        hp  : 200,
        exp : 1,
        img : 'assets/images/uf.png'
    }, {
        name: 'FSU',
        ap  : 100,
        cap : 50,
        hp  : 225,
        exp : 1,
        img : 'assets/images/fsu.png'
    
    }];
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    $.each(players, function(index, player) {
        $("<div>")
            .data('player', player)
            .appendTo('#players')
            .on('click', function() {
                var $hero = $("#hero");
                if ($hero.find("div").length == 0) {
                    $(this).appendTo("#hero");
                    $hero.fadeIn(500);
                } else if ($("#opponent").find("div").length == 0) {
                    $(this).appendTo("#opponent");
                    $('#opponent').fadeIn(750, function() {
                        $("#attack").animate({'width': 'show'}, 500);
                    });
                    $("#players").hide();
                } else {
                    console.warn('Hero & Opponent already selected');
                }
            })
            .on('refresh', function() {
                var player = $(this).data('player');
                $(this)
                    .empty()
                    .append('<h1>' + player.name + '</h1>')
                    .append('<img src="' + player.img+ '"/>')
                    .append('<p>HitPoints: ' + player.hp + '</p>')
                    .append('<p>Attack: ' + ( player.ap * player.exp ) + '</p>')
                    .append('<p>Counter: ' + player.cap + '</p>')
            }).trigger('refresh');
    });
    $("#attack").find("button").on('click', function() {
        var $hero = $('#hero');
        var hero = $hero.find('div').data('player');
        var $opponent = $('#opponent');
        var opponent = $opponent.find('div').data('player');
        opponent.hp -= ( hero.ap * hero.exp);
        if (opponent.hp <= 0) {
            console.log('opponent dead');
            var $players = $("#players");
            if ($players.find("div").length == 0) {
                var reload = confirm("You won!\n\nPlay again?");
                if (reload) {
                    window.location.reload();
                }
            }
            $players.show();
            $opponent.find('div').remove();
        } else {
            //Counter attack!
            hero.hp -= opponent.cap;
        }
        if (hero.hp <= 0) {
            console.log('team died from counter attack!');
        }
        hero.exp ++;

        $hero.find('div').data('player', hero).trigger('refresh');
        $opponent.find('div').data('player', opponent).trigger('refresh');
        console.log('team object', hero);
        console.log('opponent object', opponent);
    });

});