# Especificação do Projeto

## Perfis de Usuários

<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil 1: Jovens que querem controlar suas Finanças</th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Jovens brasileiros entre 18 e 24 anos que, ou carecem de experiência em gestão financeira e não possuem o hábito de controlar seus gastos e receitas ou que já fazem o controle de suas finanças manualmente, mas querem migrar para uma forma de controle digital.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Uma ferramenta para monitorar suas finanças, compreender onde estão gastando e evitar endividamento.</td>
</tr>
</tbody>
</table>


## Histórias de Usuários

<table>
<tbody>
<tr>
<td width="250px"><b>EU COMO... `QUEM`</b></td>
<td width="400px"><b>QUERO/PRECISO ... `O QUE`</b></td>
<td width="300px"><b>PARA ... `PORQUE`</b></td>
</tr>
<tr>
<td>Eu, como jovem que quer controlar as finanças,</td>
<td>desejo registrar minhas transações financeiras, especificando o valor, a data e a categoria,</td>
<td>para acompanhar como estou gastando meu dinheiro.</td>
</tr>
<tr>
<td>Eu, como jovem que quer controlar as finanças,</td>
<td>quero ter a capacidade de visualizar um histórico detalhado de todas as transações financeiras que registrei,</td>
<td>para entender melhor como estou gerenciando minhas finanças.</td>
</tr>
<tr>
<td>Eu, como jovem que quer controlar as finanças,</td>
<td>gostaria que a aplicação categorizasse automaticamente minhas transações com base nos dados fornecidos,</td>
<td>para ter uma visão mais clara de onde meu dinheiro está sendo gasto.</td>
</tr>
<tr>
<td>Eu, como jovem que quer controlar as finanças,</td>
<td>desejo visualizar meu saldo total atualizado, considerando todas as transações que registrei,</td>
<td>para saber quanto dinheiro tenho disponível.</td>
</tr>
<tr>
<td>Eu, como jovem que quer controlar as finanças,</td>
<td>gostaria de definir metas financeiras na aplicação e acompanhar o progresso,</td>
<td>para me manter no caminho certo para atingir meus objetivos.</td>
</tr>
<tr>
<td>Eu, como jovem que quer controlar as finanças,</td>
<td>quero gerar relatórios personalizados sobre minhas finanças,</td>
<td>para ter uma visão detalhada de diferentes aspectos das minhas transações e categorias.</td>
</tr>
</tbody>
</table>


|EU COMO... `QUEM`   | QUERO/PRECISO ... `O QUE` |PARA ... `PORQUE`                 |
|--------------------|---------------------------|----------------------------------|
| Eu, como jovem que | desejo registrar minhas   | para acompanhar como estou gas-  |
| quer controlar as  | transações financeiras,   | tando meu dinheiro               |
| finanças,          | especificando o valor, a  |                                  |
|                    | data e a categoria        |                                  |
|--------------------|---------------------------|----------------------------------|
| Eu, como jovem que | quero ter a capacidade de | para entender melhor como estou  |
| quer controlar as  | visualizar um histórico   | gerenciando minhas finanças      |
| finanças,          | detalhado de todas as     |                                  |
|                    | transações financeiras    |                                  |
|                    | que registrei             |                                  |
|--------------------|---------------------------|----------------------------------|
| Eu, como jovem que | gostaria que a aplicacao  | para ter uma visão mais clara de |
| quer controlar as  | categorizasse automatica- | onde meu dinheiro está sendo     |
| finanças,          | mente minhas transações   | gasto                            |
|                    | com base nos dados forne- |                                  |
|                    | cidos                     |                                  |
|--------------------|---------------------------|----------------------------------|
| Eu, como jovem que | desejo visualizar meu     | para saber quanto dinheiro tenho |
| quer controlar as  | saldo total atualizado,   | disponível                       |
| finanças,          | considerando todas as     |                                  |
|                    | transações que registrei  |                                  |
|--------------------|---------------------------|----------------------------------|
| Eu, como jovem que | gostaria de definir metas | para me manter no caminho certo  |
| quer controlar as  | financeiras na aplicação  | e atingir meus objetivos         |
| finanças,          | e acompanhar o progresso  |                                  |
|--------------------|---------------------------|----------------------------------|
| Eu, como jovem que | quero gerar relatórios    | para ter uma visão detalhada de  |
| quer controlar as  | personalizados sobre mi-  | diferentes aspectos das minhas   |
| finanças,          | nhas finanças             | transações e categorias          |


## Requisitos do Projeto

### Requisitos Funcionais



|ID     |                       Descrição                        | Prioridade |
|-------|--------------------------------------------------------|------------|
| RF-01 | Os usuários devem poder adicionar suas transações fi-  | Alta       | 
|       | nanceiras, especificando valor e categoria             |            |
|-------|--------------------------------------------------------|------------|
| RF-02 | A aplicação deve apresentar um histórico detalhado de  | Alta       |
|       | todas as transações realizadas                         |            |
|-------|--------------------------------------------------------|------------|
| RF-03 | Os usuários devem poder categorizar automaticamente as | Média      |
|       | transações com base nos dados fornecidos               |            |
|-------|--------------------------------------------------------|------------|
| RF-04 | Deve ser possível visualizar um saldo bom base nas     | Alta       |
|       | transações registradas                                 |            |
|-------|--------------------------------------------------------|------------|
| RF-05 | Os usuários devem ter a opção de definir metas finan-  | Média      |
|       | ceiras e acompanhar o progresso                        |            |
|-------|--------------------------------------------------------|------------|
| RF-06 | A aplicação deve permitir aos usuários gerarem relató- | Média      |
|       | rios personalizados sobre suas finanças                |            |


**Prioridade: Alta / Média / Baixa. 

### Requisitos não Funcionais

|ID      |                     Descrição                          | Prioridade |
|--------|--------------------------------------------------------|------------|
| RNF-01 | A aplicação deve cumprir com as normas estabelecidas   | Alta       | 
|        | pela LGPD, garantindo a privacidade e proteção dos da- |            |
|        | dos pessoais dos usuários                              |            |
|--------|--------------------------------------------------------|------------|
| RNF-02 | A aplicação deve ter uma interface intuitiva e de fá-  | Alta       |
|        | cil uso                                                |            |
|--------|--------------------------------------------------------|------------|
| RNF-03 | A aplicação deve ser responsiva, funcionando de forma  | Alta       |
|        | eficaz em dispositivos móveis e desktops               |            |
|--------|--------------------------------------------------------|------------|
| RNF-04 | A aplicação deve ter tempos de resposta rápidos para   | Alta       |
|        | manter uma experi~encia fluida                         |            |
|--------|--------------------------------------------------------|------------|
| RNF-05 | A solução deve ser desenvolvida utilizadno tecnologias | Média      |
|        | atuais e de fácil manutenção                           |            |
|--------|--------------------------------------------------------|------------|
| RNF-06 | A aplicação deve ser compatível com os principais na-  | Alta       |
|        | vegadores web                                          |            |


**Prioridade: Alta / Média / Baixa.
