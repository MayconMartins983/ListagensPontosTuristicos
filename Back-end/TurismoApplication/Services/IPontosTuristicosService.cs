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

        Task CreatePontoTuristico(PontoTuristico pontoTuristico);

        
    }
}
