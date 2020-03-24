DELIMITER //
CREATE PROCEDURE SP_AtualizaFilme( id_filme int, situacao VARCHAR(15))
BEGIN

	declare qtd int;
	SELECT qtd_disponivel into qtd FROM filme WHERE idfilme = id_filme;
    
    if situacao = 'Devolvido' then
		UPDATE filme SET qtd_disponivel = qtd + 1 WHERE idfilme = id_filme;
    end if ;
		
	if situacao = 'Alugado' then
		UPDATE filme SET qtd_disponivel = qtd - 1 WHERE idfilme = id_filme;
	end if; 
    
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER TRG_AtualizaQtdFilme AFTER INSERT ON aluguel
FOR EACH ROW
BEGIN
      CALL SP_AtualizaFilme(new.idfilme, new.situacao);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER TRG_AtualizaStatus AFTER UPDATE ON aluguel
FOR EACH ROW
BEGIN
      CALL SP_AtualizaFilme(new.idfilme, new.situacao);
END //
DELIMITER ;