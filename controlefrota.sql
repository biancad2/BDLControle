
drop database db_controle_frota;

create database db_controle_frota;
use db_controle_frota;


create table users
(
	id_usuario int not null auto_increment primary key,
    nm_usuario varchar(255) not null,
    nm_sobrenome varchar(255) not null,
    cd_cpf varchar(15) not null,
    cd_rg varchar(15) not null,
    nr_telefone varchar(20) null,
    email varchar(255) not null,
    password varchar(255) not null,
    created varchar(255) not null
);

create table tb_funcionarios(
	id_funcionario int not null auto_increment primary key,
    nm_funcionario varchar(255) not null,
    nm_sobrenome varchar(255) not null,
    cd_cpf varchar(15) not null,
    cd_rg varchar(15) not null,
    nr_telefone varchar(20) not null,
    email varchar(50) not null
);

create table tb_empresa
(
    id_empresa int not null auto_increment primary key,
    nm_empresa varchar(255) not null,
    cd_cnpj varchar(20) not null,
    ds_email varchar(255) not null,
    ds_endereco varchar (255) not null,
    sg_estado char(2) not null,
    num_endereco varchar(255) not null,
    ds_complemento varchar(255),
    cd_CEP varchar(10), 
    nm_cidade varchar(255) not null,
    nr_telefone varchar(20) not null,
    nr_celular varchar(20) not null,
    nm_responsavel varchar(255) not null,
    dt_validadecontrato date,
    ds_status varchar(20) not null
);


insert tb_empresa(nm_empresa, cd_cnpj, ds_email, ds_endereco, sg_estado, num_endereco, nm_cidade, nr_telefone, nm_responsavel, cd_CEP, nr_celular, ds_status) values ("Locação", "20.197.987/5670-13", "locacao@veiculos.com", "Av. Conselheiro Nébias", "SP", 555, "Santos", "(13)3290-4490", "Adenilson", 11088310, "(11)99782-9090", "Ativa");

create table tb_veiculo
(
    id_veiculo int not null auto_increment primary key,
    id_marca int not null,
    id_modelo int not null,
    ds_proprietario varchar(20),
    id_empresa int,
    qt_cilindrada int not null,
    qt_ano int not null,
    ds_cor varchar(25) not null, 
    qt_quilometragem int not null,
    qt_passageiros int not null, 
	qt_peso int not null, 
    ds_placa varchar(10) not null, 
    nr_renavam varchar(25) not null,
    ds_status varchar(25) not null,
    id_frota int not null,
    id_seguro int
);


create table tb_locacao
(
	id_locacao int not null auto_increment primary key,
    id_empresa int not null,
    id_veiculo int not null,
    dt_alugada datetime not null,
    dt_devolvida datetime,
    vl_locacao double
);


create table tb_motorista
(
    id_motorista int not null auto_increment primary key,
    nm_motorista varchar(255) not null,
    sobrenome_motorista varchar(255) not null,
    cd_cnh varchar(20) not null,
    cd_cpf varchar(20) not null,
    password varchar(255) not null,
    cd_rg varchar(20) not null,
    nr_telefone varchar(20),
    nr_celular varchar(20) not null,
    cat_cnh varchar(3) not null, 
    ds_endereco varchar (255) not null,
    sg_estado char(2) not null,
    num_endereco varchar(255) not null,
    nm_cidade varchar(255) not null,
    ds_email varchar(255) not null,
    id_empresa int,
    cd_CEP varchar(10)
);


create table tb_viagem
(
    id_viagem int not null auto_increment primary key,
    end_origem varchar(255) not null,
    cidade_origem varchar(255) not null,
    data_saida datetime,
    end_destino varchar(255) not null,
    cidade_destino varchar(255) not null,
    data_chegada datetime,
    km int not null,
    id_veiculo int,
    id_empresa int,
    id_motorista int,
    dt_iniciada datetime,
    dt_finalizada datetime,
    cd_CEPOrigem varchar(10), 
    cd_CEPDestino varchar(10),
    sg_estadoOrigem char(2),
     sg_estadoDestino char(2)
);

create table tb_manutencao
(
    id_manutencao int not null auto_increment primary key,
    tipo_manut varchar(255) not null,
    servico varchar(255) not null,
    causa varchar(255) not null,
    valor_manut int not null,
    km int not null,
    id_veiculo int,
    dt_manutencao datetime
);




create table tb_marca
(
    id_marca int not null auto_increment primary key,
    marca varchar(255)
);

create table tb_produto
(
    id_produto int not null auto_increment primary key,
    qt_produto int not null,
    nm_produto varchar(255),
    ds_produto varchar(255)
);

create table tb_frota
(
    id_frota int not null auto_increment primary key,
    ds_frota varchar(255) not null
    
);

create table tb_modelo
(
    id_modelo int not null auto_increment primary key,
    id_marca int not null,
    desc_modelo varchar(255) not null
    
);

create table tb_seguro
(
	id_seguro int not null auto_increment primary key,
    desc_seguro varchar(255) not null,
    desc_sinistro varchar(255) not null,
    limite_garantia int not null,
    data_inicio int not null, 
    id_veiculo int not null
);

create table tb_multa
(
	id_multa int not null auto_increment primary key,
    dt_infracao datetime not null,
    ds_infracao varchar(255),
    id_veiculo int not null,
    ds_gravidade varchar(255) not null,
    qt_preco double,
    id_motorista int,
    ds_status varchar(20)
);

alter table tb_seguro 
add constraint fk_seguveicu foreign key (id_veiculo) references tb_veiculo(id_veiculo);

alter table tb_veiculo 
add constraint fk_veimarca foreign key (id_marca) references tb_marca (id_marca);

alter table tb_veiculo 
add constraint fk_veiseguro foreign key (id_seguro) references tb_seguro (id_seguro);

alter table tb_veiculo 
add constraint fk_veimodelo foreign key (id_modelo) references tb_modelo (id_modelo);

alter table tb_veiculo 
add constraint fk_veiempresa foreign key (id_empresa) references tb_empresa (id_empresa);


alter table tb_manutencao 
add constraint fk_manutveic foreign key (id_veiculo) references tb_veiculo(id_veiculo);



alter table tb_viagem 
add constraint fk_viagemveic foreign key (id_veiculo) references tb_veiculo(id_veiculo);

alter table tb_viagem 
add constraint fk_viagemmoto foreign key (id_motorista) references tb_motorista(id_motorista);

alter table tb_motorista 
add constraint fk_motoempresa foreign key (id_empresa) references tb_empresa (id_empresa);


alter table tb_locacao 
add constraint fk_locaempresa foreign key (id_empresa) references tb_empresa (id_empresa);

alter table tb_locacao
add constraint fk_locaveiculo foreign key (id_veiculo) references tb_veiculo (id_veiculo);

alter table tb_veiculo 
add constraint fk_veifrota foreign key (id_frota) references tb_frota (id_frota);

alter table tb_modelo
add constraint fk_marca foreign key (id_marca) references tb_marca (id_marca);

alter table tb_viagem
add constraint fk_viagemempresa foreign key (id_empresa) references tb_empresa(id_empresa);


alter table tb_multa
add constraint fk_veiculomulta foreign key (id_veiculo) references tb_veiculo(id_veiculo);

alter table tb_multa
add constraint fk_motoristamulta foreign key (id_motorista) references tb_motorista(id_motorista);
#DELIMITER $$
#create trigger tr_data_vencimento after insert 
#	on tb_empresa
#	FOR EACH ROW
#	begin
#		set @tempo = (select tempo_contrato from tb_empresa where id_empresa = NEW.id_empresa);
#		set @dt_vc = adddate(CURDATE( ), INTERVAL @tempo MONTH);
#		insert into tb_empresa(dt_validadecontrato) values (@dt_vc);
 #   end$$
#DELIMITER ;

insert tb_frota(ds_frota) values ("Caminhão");
insert tb_frota(ds_frota) values ("Caminhonete");
insert tb_frota(ds_frota) values ("Carro");
insert tb_frota(ds_frota) values ("Moto");
insert tb_frota(ds_frota) values ("Ônibus");
insert tb_frota(ds_frota) values ("Van");

insert tb_marca(marca) values ("Audi");
insert tb_marca(marca) values ("BMW");
insert tb_marca(marca) values ("Citroën");
insert tb_marca(marca) values ("Fiat");
insert tb_marca(marca) values ("Ford");
insert tb_marca(marca) values ("Mercedes Benz");
insert tb_marca(marca) values ("Honda");
insert tb_marca(marca) values ("Volkswagen");
insert tb_modelo(id_marca,desc_modelo) values (1, "A3 Sportback");
insert tb_modelo(id_marca,desc_modelo) values (1, "A3 Sedan");
insert tb_modelo(id_marca,desc_modelo) values (1, "A4 Avant");

insert tb_modelo(id_marca,desc_modelo) values (2, "Série 3");
insert tb_modelo(id_marca,desc_modelo) values (2, "X5");
insert tb_modelo(id_marca,desc_modelo) values (2, "X6");
insert tb_modelo(id_marca,desc_modelo) values (2, "G 310 GS");
insert tb_modelo(id_marca,desc_modelo) values (2, "F 750 GS");

insert tb_modelo(id_marca,desc_modelo) values (3, "C3 Urban Trail");
insert tb_modelo(id_marca,desc_modelo) values (3, "Aircross Live Auto");

insert tb_modelo(id_marca,desc_modelo) values (4, "Toro");
insert tb_modelo(id_marca,desc_modelo) values (4, "Mobi");
insert tb_modelo(id_marca,desc_modelo) values (4, "Uno");
insert tb_modelo(id_marca,desc_modelo) values (4, "Fiorino");

insert tb_modelo(id_marca,desc_modelo) values (5, "Ranger");
insert tb_modelo(id_marca,desc_modelo) values (5, "Mustang");
insert tb_modelo(id_marca,desc_modelo) values (5, "Fusion");

insert tb_modelo(id_marca,desc_modelo) values (6, "OF 1721");
insert tb_modelo(id_marca,desc_modelo) values (6, "OF 1721L");
insert tb_modelo(id_marca,desc_modelo) values (6, "OF 1724");
insert tb_modelo(id_marca,desc_modelo) values (6, "Sprinter");
insert tb_modelo(id_marca,desc_modelo) values (6, "710");

insert tb_modelo(id_marca,desc_modelo) values (7, "Civic");
insert tb_modelo(id_marca,desc_modelo) values (7, "Fit");
insert tb_modelo(id_marca,desc_modelo) values (7, "CR-V");
insert tb_modelo(id_marca,desc_modelo) values (7, "Biz 110i");
insert tb_modelo(id_marca,desc_modelo) values (7, "CG 160 Cargo");
insert tb_modelo(id_marca,desc_modelo) values (7, "CG 160 Start");


insert tb_modelo(id_marca,desc_modelo) values (8, "24250");
insert tb_modelo(id_marca,desc_modelo) values (8, "8150");

