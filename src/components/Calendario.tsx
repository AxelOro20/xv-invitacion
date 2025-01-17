import "./Calendario.css";

const Calendario = () => {
  return (
    <div className="calendario">
      <h3 className="titulo">Reserva este día</h3>
      <h2 className="mes">Marzo</h2>
      <table>
        <thead>
          <tr>
            <th>Lu</th>
            <th>Ma</th>
            <th>Mi</th>
            <th>Ju</th>
            <th>Vi</th>
            <th>Sa</th>
            <th>Do</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td>1</td><td>2</td>
          </tr>
          <tr>
            <td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td>
          </tr>
          <tr>
            <td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td>
            <td className="resaltado">16</td>
          </tr>
          <tr>
            <td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td>
            {/* Día destacado */}
            <td>23</td>
          </tr>
          <tr>
            <td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td>
          </tr>
          <tr>
            <td>31</td><td></td><td></td><td></td><td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calendario;
