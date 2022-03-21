using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TurismoApplication.Models;
using TurismoApplication.Models.Context;
using TurismoApplication.Services;

namespace TurismoApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontosTuristicosController : ControllerBase
    {
        private IPontosTuristicosService _pontoTuristicoService;

        public PontosTuristicosController(IPontosTuristicosService pontoTuristicoService)
        {
            _pontoTuristicoService = pontoTuristicoService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<PontoTuristico>>> GetCLientesGetPontoTuristico()
        {
            try
            {
                var pontoTuristico = await _pontoTuristicoService.GetPontoTuristico();
                return Ok(pontoTuristico);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error ao obter os pontos turísticos");
            }
        }

       

        [HttpGet("skip/{skip}/take/{take}")]
        public async Task<IActionResult> GetAsync (
                [FromServices] AppDbContext context,
                int skip = 0,
                int take = 2)
        {
            var totalCount = await context.PontosTuristicos.CountAsync();
            var pontosturisticos = await context.PontosTuristicos             
                .AsNoTracking()                
                .Skip(skip)
                .Take(take)
                .ToListAsync();
            return Ok(new {
                totalCount,
                dados = pontosturisticos
            });
        }

        [HttpGet("{id:int}", Name = "GetPontoTuristico")]
        public async Task<ActionResult<IAsyncEnumerable<PontoTuristico>>> GetPontoTuristico(int id)
        {
            try
            {
                var pontoTuristico = await _pontoTuristicoService.GetPontoTuristico(id);
                if (pontoTuristico == null)
                    return NotFound($"Não Existem ponto turístico com o id {id}");
                return Ok(pontoTuristico);
            }
            catch
            {
                return BadRequest("Request invalido");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(PontoTuristico pontoTuristico)
        {
            try
            {
                await _pontoTuristicoService.CreatePontoTuristico(pontoTuristico);
                return CreatedAtRoute(nameof(GetPontoTuristico), new { id = pontoTuristico.Id }, pontoTuristico);
            }
            catch
            {
                return BadRequest("Request invalido");
            }
        }

    }
}

