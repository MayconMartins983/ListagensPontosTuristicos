using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TurismoApplication.Models;

namespace TurismoApplication.Services
{
    public interface IPontosTuristicosService
    {
        Task<IEnumerable<PontoTuristico>> GetPontoTuristico();
        Task<PontoTuristico> GetPontoTuristico (int Id);

        Task<IEnumerable<PontoTuristico>> GetPontoTuristicoByName(string name);

        Task CreatePontoTuristico(PontoTuristico pontoTuristico);

        Task UpdatePontoTuristico(PontoTuristico pontoTuristico);

        Task DeletePontoTuristico(PontoTuristico pontoTuristico);
    }
}
